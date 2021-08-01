// Static site builder

// Modules
import { promises as fs } from 'fs';
import path from 'path';
import hashDict from './hash.js';
import shell from 'shelljs';
import frontMatter from 'front-matter';
import nunjucks from 'nunjucks';
import remark from 'remark';
import remarkHTML from 'remark-html';
import remarkSlug from 'remark-slug';
import remarkHighlight from 'remark-highlight.js';

// copy of hashDict to modify
let currHashDict = JSON.parse(JSON.stringify(hashDict))

// Destination directory
const publicDirPath = new URL('public', import.meta.url).pathname;

// Template directory
const templateDirPath = new URL('templates', import.meta.url).pathname;

// Source directory
const contentDirPath = new URL('content', import.meta.url).pathname;


// get sha256 hash of file
const hashFile = (filePath) => {
  console.log(`\n hashing ${filePath} \n`)
  const result = shell.exec(`sha256sum ${filePath}`).stdout;
  const hash = result.split(' ')[0]; // get checksum from output
  return hash;
}

// Get files in dirPath with optional fileExt
const getFiles = async (dirPath, fileExt = '') => {
  // List all the entries in the directory.
  const dirContents = await fs.readdir(dirPath, { withFileTypes: true });

  return (
    dirContents
      // Omit any sub-directories.
      .filter(dirContent => dirContent.isFile())
      // Ensure the file extension matches a given extension (optional).
      .filter(dirContent =>
        fileExt.length ? dirContent.name.toLowerCase().endsWith(fileExt) : true
      )
      // Return a list of file names.
      .map(dirContent => dirContent.name)
  );
};

// removeFiles deletes all files in a directory that match a file extension.
const removeFiles = async (dirPath, fileExt, removeAll) => {
  // Get a list of all files in the directory.
  const fileNames = await getFiles(dirPath, fileExt);

  // Create a list of files to remove.
  const filesToRemove = fileNames.map(fileName => {
    // get hash of file
    const filePath = path.resolve(dirPath, fileName);
    const prevHash = currHashDict[filePath];
    const currHash = hashFile(filePath);
    // if file has changed, delete it.
    if (prevHash != currHash || removeAll) {
      console.log(`\n ${fileName} has changed\n`)
      fs.unlink(filePath);
      console.log(`\n removed ${fileName} \n`)
    }
    else {
      console.log(`\n ${fileName} has not changed\n`)
    }
  });

  return Promise.all(filesToRemove);
};

// Turn Markdown into a dict.
const parseMarkdown = (fileName, fileData) => {
  // Strip the extension from the file name to get a slug.
  const slug = path.basename(fileName, '.md');
  // Split the file content into the front matter (attributes) and post body.
  const { attributes, body } = frontMatter(fileData);

  return { ...attributes, body, slug };
};

/**
 * getContent lists and reads all the Markdown files in the posts directory,
 * returning a list of post objects after parsing the file contents.
 */
const getContent = async (dirPath) => {
  // Get a list of all Markdown files in the directory.
  const fileNames = await getFiles(dirPath, '.md');

  // Create a list of files to read.
  const filesRead = fileNames.map(fileName =>
    fs.readFile(path.resolve(dirPath, fileName), 'utf-8'))

  // Asynchronously read all the file contents.
  const fileData = await Promise.all(filesRead);

  // return parsed contents
  return fileNames.map((fileName, i) => parseMarkdown(fileName, fileData[i]));
};

// getTemplatePath creates a file path to a .njk template file.
const getTemplatePath = (dirName, fileName) => {
  // console.log(`dir ${dirName} file ${fileName}`)
  // console.log(path.resolve(dirName, path.format({ name: fileName, ext: '.njk' })));
  return path.resolve(dirName, path.format({ name: fileName, ext: '.njk' }));
}

const markdownToHTML = text =>
  new Promise((resolve, reject) =>
    remark()
      .use(remarkHTML)
      .use(remarkSlug)
      .use(remarkHighlight)
      .process(text, (err, file) =>
        err ? reject(err) : resolve(file.contents)
      )
  );

const createContentFile = async (fileData, outputPath) => {
    // Use nunjucks to render an html page from markdown data.
    // const type = fileData.type;
    console.log(`\n turning ${fileData.title} to HTML \n`);
    const template = 'post';
    const templatePath = getTemplatePath(templateDirPath, template)
    // console.log(`templatePath ${templatePath}`);

    // Use the template engine to generate the file content.
    const contentFile = nunjucks.render(templatePath, {
      ...fileData,
      // Convert Markdown to HTML.
      body: await markdownToHTML(fileData.body)
    });

    // Combine the slug and file extension to create a file name.
    const fileName = path.format({ name: fileData.slug, ext: '.html' });

    // Create a file path in the destination directory.
    const filePath = path.resolve(outputPath, fileName);

    // Save the file in the desired location.
    // only write if the file doesn't exist.
    try {
      await fs.writeFile(filePath, contentFile, { flag: 'wx' });
    } catch (e) {
      console.log(`\n thanks for not overwriting ${fileData.title} \n`)
    }

    const hash = hashFile(filePath);

    // write to currHashDict;
    currHashDict[filePath] = hash;

    return fileData;
}

// createIndexFile generates an index file.
const createIndexFile = async (content) => {

  let posts = [];
  let projects = [];
  let wikis = [];

  content.forEach((item) => {
    switch(item.type) {
      case 'post':
        posts.push(item);
        break;
      case 'project':
        projects.push(item);
        break;
      case 'wiki':
        wikis.push(item);
        break;
      default:
        wikis.push(item);
        break;
    }
  });

  // content.filter(c => c.type == 'post');
  // const wiki = content.filter(c => c.type != 'post');
  // const projects = content.filter(c => c.type == 'project');

  // Use the template engine to generate the file content.
  const fileData = nunjucks.render(getTemplatePath('templates','index'), {
    sections: [
      {
        title: 'Blog',
        items: posts
      },
      {
        title: 'Wiki',
        items: wikis
      },
      {
        title: 'Projects',
        items: projects
      },
    ]
  });
  // Create a file path in the destination directory.
  const filePath = path.resolve(publicDirPath, 'index.html');

  // Save the file in the desired location.
  // this should always get updated
  await fs.writeFile(filePath, fileData, 'utf-8');
};

const build = async () => {
  console.log(`starting blog generation...`)
  // Ensure the public directory exists.
  await fs.mkdir(publicDirPath, { recursive: true });

  // Delete any previously-generated HTML files in the public directory.
  console.log(`removing previous HTML files...`)

  const removeAll = (process.argv[2] === 'flush') ? true: false; // send arg
  console.log(`remove All?: ${removeAll}`);

  await removeFiles(publicDirPath, '.html', removeAll);

  // Get all the Markdown files in the content directory.
  console.log(`fetching markdown content...`)
  const content = await getContent(contentDirPath);

  // write content to file
  const createdContent = await Promise.all(content
    .filter(c => Boolean(c.public))
    .map(c => createContentFile(c, publicDirPath, 'template')));

    await createIndexFile(
      // Sort created content by publish date (newest first).
      createdContent.sort((a, b) => new Date(b.date) - new Date(a.date))
    );

  await fs.writeFile('hash.js', 'export default ');
  await fs.appendFile('hash.js', JSON.stringify(currHashDict));

  return createdContent;
}

build()
  .then(created =>
    console.log(`Build successful. Generated ${created.length} items(s).`)
  )
  .catch(err => console.error(err));
