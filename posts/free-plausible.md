---
title: "Cheap analytics"
description: "Self hosting plausible analytics"
date: "2021-07-12"
public: true
---

### The dilemma

Pay $6/month or self host Plausible Analytics in the cloud. One is relatively cheap, fast to deploy, and guaranteed to work. The other is tricky, technical, and might end up costing more in the long run.

However, as I [mentioned](hello-world.html) in my first post, I want to learn for understanding, not speed. So this is my journey of self-hosting Plausible Analytics:

### Background
[Plausible Analytics](plausible) is a lightweight, open source analytics platform for basic website data. They allow self-hosting and have a bunch of [reasons](reasons) why they're better than Google Analytics.

The self hosted instance comes in a [Docker](docker) image. This image runs in a container built with [Docker Compose](compose), which can run multiple containers linked to each other (for example, a client and database).

### Self hosting options

| Service        | Pros           | Cons     |
| :------------- | :------------- | :------------- |
| Heroku       | totally free. Learn more about Docker       | need to write custom Dockerfiles and use Heroku's custom `heroku.yml`       |
| Amazon Web Services       | free tier, good docs       | more infrastructure than I need for a simple deployment. Also potentially more $$       |
| Digital Ocean       |   simpler than AWS    | $5/month        |
| localhost       | It works       | I don't want to spend CPU / battery running Docker all the time       |

### Attempt #1: AWS (3 days)

1. Follow tutorial: [AWS how to Docker](https://aws.amazon.com/blogs/containers/deploy-applications-on-amazon-ecs-using-docker-compose/)
  - [x] Following the Yelb tutorial worked successfully.
2. Debug - running this with Plausible's dockerfile creates problems
  - [x] Comment out volumes because I don't want to deploy a persisted database on AWS (too complicated for right now)
  - [ ] Plausible runs on AWS but I can't interact with the database with a `docker exec psql ... verify admin email` command. This is necessary for disabling admin email authorization.
  - [x] explain docker context


### `docker exec` debug options
1. Find a way to run the `docker exec` command in the docker-compose before hosting on AWS.
  - [ ] run my own shell command to interact with `psql `in `docker-compose`
    * I can run commands, but I need to access the `plausible_db` container *after* the `plausible` container has created the admin user. I haven't figured out how to
2. Configure an SMTP server on AWS so I can get an email verification from Plausible
  - [ ] Configure SMTP to work locally.
      * `mail_1 | 245 Connecting to gmail-smtp-in.l.google.com [2607:f8b0:400d:c02::1a]:25 ... failed: Cannot assign requested address`
  - [x] https://github.com/BytemarkHosting/docker-smtp config fixed this


3. Follow Amazon's [documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html) on how get `docker exec` to work.
4. Problems:
  1. URL changes for each deploy.
    1. Seems odd to only access my hosted instance via LoadBalancer (instead of URL)
  2. Need HTTPS certificate
  3.

### Attempt #2 Digital Ocean

1. Create a Digital Ocean droplet
2. generate ssh key
3. Todo:
  4. Understand HTTPS, connect my domain name plausible.one to DNS
5. 
