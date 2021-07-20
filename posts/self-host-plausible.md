---
title: "Self-Hosting Plausible Analytics "
description: "Why it's worth it to save $1"
date: "2021-07-12"
public: true
---

### Why Plausible for website analytics?  

[Plausible Analytics](plausible) is a lightweight, open source analytics platform for basic website data. They have a bunch of [reasons](reasons) why they're better than Google Analytics.

### Why self host?
 - Learn about `Docker`, `remote hosting`, `SMTP`, `DNS`, `https`, and `nginx`
 - Save $1

This article will attempt to explain key concepts about web programming and share the steps I took to get Plausible working. However, if you're just here for the code, each section that is explaining a concept or why it works will be minimized so you can expand as you'd like.

### 1. Get Plausible running locally.

The Plausible team has an [example repository](https://github.com/plausible/hosting) for how to self-host their service. The code is run via Docker and Docker Compose.
<details>
  <summary>What is Docker?</summary>  

  ## Docker  
  Docker is a technology for writing code that can run on any machine. Normally, if I write a program on a Mac operating system and try to run that code on Ubuntu, I need to follow a different procedure to get the code running (`apt-get` instead of `brew install` for packages, etc...).

  However, with Docker, I can spin up a virtual machine called a *container* that allows me specify what OS to use, what packages to install, and what code to run. Once code works for one container, anyone can run it immediately by creating a copy of that container. This has removed the massive headache of developing software for multiple system configurations.

  In Docker terminology, an *image* is the steps required to create a specific docker container and a *container* is when you actually run the image. The image is defined by something called a Dockerfile, which is a text file that specifies the image configuration.

</details>
&nbsp;  
<details>
  <summary>What is Docker Compose?</summary>  

  ## Docker Compose

  Docker Compose is a technology that allows you to run multiple Docker containers that can interact with each other. For example, if I was just running Docker and I had a front end web page and a database, I would need to run multiple services in one container. This could get messy for debugging purposes, so Docker Compose allows me to run each service in one container, but have the containers talk to each other.

  A Docker Compose file tells Docker which containers to create and governs how the containers will interact with each other. Most web applications need multiple containers, so Docker Compose is a common tool.

</details>  
&nbsp;

1. Follow steps 1, 2, and 3 from Plausible's self-hosting [docs](https://plausible.io/docs/self-hosting). Pause when you get to this line:  
>You can now navigate to http://{hostname}:8000 and see the login screen.

  Make sure hostname (`BASE_URL`)  `= http://localhost:8000`. You should now able to see Plausible running on your machine.
  * My `plausible-conf.env` initally looks like this:
    ```
      ADMIN_USER_EMAIL=agoss98@gmail.com
      ADMIN_USER_NAME=tony
      ADMIN_USER_PWD=goss01
      BASE_URL=http://localhost
      SECRET_KEY_BASE=Uwtj/n2mrNzUMDo9hypcpOsYd1+JP0JwunIPgcTSJLA8wLOrFe5w4COtxF0ZicTj
      CgQXCJ9+FJpZVQzHIN65Sw==
    ```
  * Note: the password must be > 5 characters.


2. Login with your email and password, then request to be emailed the activation code.  

  **This didn't work for me**. I kept getting the following error:  
  ```bash
  243 Connecting to gmail-smtp-in.l.google.com [2607:f8b0:400d:c00::1b]:25 ... failed: Cannot assign requested address

  243 LOG: MAIN

  243 H=gmail-smtp-in.l.google.com [2607:f8b0:400d:c00::1b] Cannot assign requested address
```
  * Note: I'm still not sure why the standard SMTP container wasn't able to send mail directly.


3. Clearly, the SMTP mail server wasn't working with the default settings.

  <details>
    <summary>What is SMTP?</summary>

    ## SMTP (Simple Mail Transfer Protocol)
    SMTP is an internet standard communication protocol for electronic mail transmission.  Simply put, SMTP sets a standard for how computers that send e-mail should talk to each other. Mail servers typically run SMTP.

  </details>
  &nbsp;

    To solve this issue, I examined the Docker image for [`bytemark/smtp`](https://github.com/BytemarkHosting/docker-smtp), the mail server Plausible uses.

    The following configuration in the `hosting/docker-compose` file solved my issue:

    ```yaml
    mail:
      image: bytemark/smtp
      restart: always
      environment:
        SMTP_HOST_PORT: 587
        RELAY_HOST: smtp.gmail.com
        RELAY_PORT: 587
        RELAY_USERNAME: agoss98@gmail.com
        RELAY_PASSWORD: ethknhailjzbyfii
    ```

      * Note that the `RELAY_PASSWORD` is my Google App Password, not my standard password.


4. I needed two extra steps to get Gmail to allow this mail to send:
  1. Allow less-secure apps to [access](https://support.google.com/accounts/answer/6010255) my account
  2. Set an app [password](https://support.google.com/accounts/answer/185833) that allows access to Gmail.


### 2. Get Plausible running on a remote host


<details>
  <summary>What is remote hosting?</summary>

  ## Remote hosting
  If I wanted to host Plausible on my own computer I could... but I would be using precious battery life, CPU power, and RAM to run the code. For short-term instances of putting something online, local hosting is fine, but because I want Plausible to always be running, I don't want to spend my computer's resources.  

  Good news! For $5/month, Digital Ocean, a cloud service provider, let's me run software on one of their servers.

</details>
&nbsp;

1. Get a Digital Ocean [account](https://www.digitalocean.com/?refcode=d2a3afe52625&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=CopyPaste)
2. Set up a [basic Droplet](https://docs.digitalocean.com/products/droplets/) at the cheapest level ($5/month)
3. Connect remotely to your Droplet via your own console via [ssh](https://docs.digitalocean.com/products/droplets/how-to/connect-with-ssh/).
  * After running `ssh root@DROPLET_ID_ADDRESS`, you should see the following in your Terminal:
  ```zsh
    Welcome to DigitalOcean's 1-Click Docker Droplet.
    To keep this Droplet secure, the UFW firewall is enabled.
    All ports are BLOCKED except 22 (SSH), 2375 (Docker) and 2376 (Docker).

    * The Docker 1-Click Quickstart guide is available at:
      https://do.co/3j6j3po#start

    * You can SSH to this Droplet in a terminal as root: ssh root@DROPLET_ID_ADDRESS

    * Docker is installed and configured per Docker's recommendations:
      https://docs.docker.com/install/linux/docker-ce/ubuntu/

    * Docker Compose is installed and configured per Docker's recommendations:
      https://docs.docker.com/compose/install/#install-compose

    For help and more information, visit https://do.co/3j6j3po
  ```  

  <details>
    <summary>What is SSH?</summary>

    ## SSH
    1. What is it?  

          The SSH key command instructs your system that you want to open an encrypted Secure Shell Connection to access a remote server over the Internet.
    2. How does it work?  

      SSH relies on multiple cryptographic techniques, including symmetric encryption, asymmetric encryption, and hashing. This provides guarantees about the security of the connection to the remote server.

  </details>  
  &nbsp;


4. Send the `plausible/hosting` repo to the Droplet via `scp` (secure copy):

    `scp -r /hosting root@DROPLET_ID_ADDRESS:/hosting`

5. Make the following edits to the `plausible-conf.env` file:  

  ```
    BASE_URL=http://DROPLET_ID_ADDRESS:8000
  ```
  * Note: You can edit remote files on your local text editor with [SFTP](https://www.digitalocean.com/community/tutorials/how-to-use-sftp-to-securely-transfer-files-with-a-remote-server)


6. Run `docker compose up -d` from the `/hosting` repo. You should now see Plausible at `http://DROPLET_ID_ADDRESS:8000` on the Internet!

7. Follow the instructions and copy the following snippet into your website:
```js
<script async defer data-domain="my-website" src="http://DROPLET_ID_ADDRESS:8000/js/plausible.js"></script>
```
  *  Note that *my-website* is the name of the website you'd like to get analytics for.


8. Identify problem: Because modern web browsers won't [allow](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content/How_to_fix_website_with_mixed_content) you to run a script on your website that is not served with HTTPS, the Plausible script won't run on your website. This brings us to our final task:


### 3. Add HTTPS to remote host
<details>
  <summary>What is HTTPS?</summary>

  ## HTTPS

  **What is HTTP?**

  *Hyper Text Transfer Protocol*

  First pioneered by Tim Berners-Lee, this protocol defines how to Hyper Text documents -- documents that can link to other documents -- should be shared between computers. This protocol is the *lingua franca* of the Web. Every website we visit is eventually represented in Hyper Text (HTML).

  **How does it work?**

  HTTP is handles the communication between a web client and a server. If I want to load `http://espn.com`, my web browser requests the content located at `http://espn.com`. ESPN receives that request and returns content to my browser. HTTP provides the rules for engaging in this `request / response` transaction.

  **Sounds great! Why is HTTP dangerous?**
  > In HTTP all this data is sent in plaintext for anyone to read.

  This can be credit card info, passwords, etc..

  > HTTPS is HTTP with encryption. The only difference between the two protocols is that HTTPS uses TLS (SSL) to encrypt normal HTTP requests and responses.

  So, Instead of sending HTTP over a basic TCP/IP stack, Netscape Communications (the founders of Firefox) created an additional encrypted transmission layer on top of it. This simply allows the client and server to guarantee that:
  1. the server is who they say they are
  2. no one can read the data sent between client and server
  3. the data sent from server to client can be verified as *untampered*.  

This layer, **HTTP + S(ecure), is called HTTPS!**

</details>  
&nbsp;

1. Get a website name. Right now, my Plausible instance is hosted at the IP address `DROPLET_ID_ADDRESS:8000`. This is a problem because
> One of the main functions of SSL is to prove to the user that they are really connecting to the site they requested, and not to an attacker masquerading as the end site. Without linking the domain name to the certificate this would not be possible

  So, an IP address is nice, but I need to connect it to a *domain name* to set up HTTPS.
2. For $2, I bought `plausible.on` from Namecheap, a domain purchasing service.
<details>
  <summary>What's DNS </summary>

  ## DNS
  [DNS](https://www.digitalocean.com/community/tutorials/an-introduction-to-dns-terminology-components-and-concepts) is the system for mapping human readable names to the IP address of the computer.
</details>


3. Verify my domain via email. This is the most basic level of certification: I control the name I bought.
4. [Connect](https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars) my domain name to my hosted Plausible instance via Digital Ocean
> To set up a domain name, you need to purchase a domain name from a domain name registrar and then set up DNS records for it. Registrars are organizations that have completed an [accreditation process](https://www.icann.org/resources/pages/accreditation-2012-02-25-en) that allows them to sell domain names. DigitalOcean is not a domain name registrar, but you can manage your DNS records from the DigitalOcean Control Panel

  This allows Digital Ocean to manage my domain's DNS record.

5. Wait 30 min - 2 hrs
  > It will take some time for the name server changes to propagate after you’ve saved them. During this time, the domain registrar communicates the changes you’ve made with your ISP (Internet Service Provider)

6. Configure nginx.

  <details>
    <summary>What's a reverse proxy </summary>

    ## Reverse proxy

    Read this fantastic [tutorial](https://www.freecodecamp.org/news/docker-nginx-letsencrypt-easy-secure-reverse-proxy-40165ba3aee2/):

    A reverse proxy allows you to direct all incoming traffic to your server. We want all requests for `plausible.on` to be secured with HTTPS.
  </details>
  &nbsp;  

  1. Follow the steps listed in this fantastic self-hosting [tutorial](https://theselfhostingblog.com/posts/completely-self-hosting-plausible-io-a-privacy-friendly-alternative-to-google-analytics/#configuring-nginx):


7. Add to your snippet website and celebrate:
  ```js
<script async defer data-domain="my-website" src="https://DROPLET_ID_ADDRESS/js/plausible.js"></script>
  ```  

  * Note: Now that you're using a reverse proxy, you don't need to specify the port number because the proxy routes all traffic to port 8000 as specified in the `server` template you added to `nginx.conf`

### 4. Conclusion

As you can see, the simple act of self-hosting Plausible required me to learn about a variety of web-based concepts. When the dust settled, I learned a lot and saved $1 per month (woohoo!)
