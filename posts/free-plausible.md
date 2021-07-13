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

The self hosted instance comes in a [Docker](docker) image. This image runs in a container built with [Docker Compose](compose), which can run multiple sub-images within the main container.

### Self hosting options

| Service        | Pros           | Cons     |
| :------------- | :------------- | :------------- |
| Heroku       | totally free. Learn more about Docker       | need to write custom Dockerfiles and use Heroku's custom `heroku.yml`       |
| Amazon Web Services       | free tier, good docs       | more infrastructure than I need for a simple deployment. Also potentially more $$       |
| Digital Ocean       |   simpler than AWS    | $5/month        |
| localhost       | It works       | I don't want to spend CPU / battery running Docker all the time       |

### Attempt #1: AWS

1. Follow tutorial: [AWS how to Docker](https://aws.amazon.com/blogs/containers/deploy-applications-on-amazon-ecs-using-docker-compose/)
  - [x] Following the Yelb tutorial worked successfully.
2. Debug - running this with Plausible's dockerfile creates problems
  - [x] Comment out volumes because I don't want to deploy a persisted database on AWS (too complicated for right now)
  - [ ] Plausible runs on AWS but I can't interact with the database with a `docker exec` command. This is necessary for disabling admin email authorization.


### `docker exec` debug options
1. Find a way to run the `docker exec` command in the docker-compose before hosting on AWS.
2. Configure an SMTP server on AWS so I can get an email confirmation from Plausible
3. Follow Amazon's [documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html) on how get `docker exec` to work.
