import glob from 'glob';
import util from 'util';

const promiseGlob = util.promisify(glob);
const main = async () => {
const res = await promiseGlob(
  `**/*.md`,
  {cwd: '/Users/anthonygoss/Website/cha0sg0d.github.io/content'})

console.log(res)

}

main()
