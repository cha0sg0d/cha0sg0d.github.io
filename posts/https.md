---
title: "https? ssl? ssh? dns?"
description: "Learning some goddam acronyms"
date: "2021-07-15"
public: false
---

### The problem
I successfully served Plausible Analytics via HTTP on Digital Ocean.
However, to get the analytics script to run on my website, I need to to serve the `plausible/js` script over HTTPS.
Modern browsers, for standard security practices, don't want people to unwittingly load and run unsecured `active content` (Javascript) on their websites.

Once again, there is an easy way out: buy a domain name with SSL attached.

However, that defeats the purpose of learning what is actually going on behind the scenes.

### The solution:

Buy a domain name and secure it with HTTPS. Then connect my Digital Ocean remote host to this domain name. <- What does this actually mean though? Let's explore.

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


**So, how do I set up HTTPS for my website?**

1. Get a website name. Right now, my Plausible instance is hosted at the IP address `206.81.10.102:8000`. This is a problem because
> One of the main functions of SSL is to prove to the user that they are really connecting to the site they requested, and not to an attacker masquerading as the end site. Without linking the domain name to the certificate this would not be possible

  So, an IP address is nice, but I need to connect it to a *domain name* to set up HTTPS.
2. For $2, I bought `plausible.one` from Namecheap, a domain purchasing service.
3. Verify my domain via email. This is the most basic level of certification: I control the name I bought.
3. [Connect](https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars) my domain name to my hosted Plausible instance via Digital Ocean
> To set up a domain name, you need to purchase a domain name from a domain name registrar and then set up DNS records for it. Registrars are organizations that have completed an [accreditation process](https://www.icann.org/resources/pages/accreditation-2012-02-25-en) that allows them to sell domain names. DigitalOcean is not a domain name registrar, but you can manage your DNS records from the DigitalOcean Control Panel

  This allows Digital Ocean to manage my domain's DNS record.

4. Wait
  > It will take some time for the name server changes to propagate after you’ve saved them. During this time, the domain registrar communicates the changes you’ve made with your ISP (Internet Service Provider)

5. Success!

6. Test https + docker compose on my domain with a micro example app.

7. Translate this to plausible!

**What's DNS?**

[DNS](https://www.digitalocean.com/community/tutorials/an-introduction-to-dns-terminology-components-and-concepts) is the system for mapping human readable names to the IP address of the computer.


<details>
  <summary>hi</summary>

  ## Heading
  1. A numbered
  2. list
     * With some
     * Sub bullets
</details>




https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/
