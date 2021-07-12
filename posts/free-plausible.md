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
>  Run Docker on AWS:

> AWS provides support for both Docker open-source and commercial solutions. There are a number of ways to run containers on AWS, including Amazon Elastic Container Service (ECS) is a highly scalable, high performance container management service. Customers can easily deploy their containerized applications from their local Docker environment straight to Amazon ECS. AWS Fargate is a technology for Amazon ECS that lets you run containers in production without deploying or managing infrastructure.

1. Follow tutorial: [Getting started with Docker](https://aws.amazon.com/blogs/containers/deploy-applications-on-amazon-ecs-using-docker-compose/)
  1.
