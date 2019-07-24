# Introduction to Kubernetes

Kubernetes is server orchestra that helps to deploy and scale app easily with the concept of `containerization`:

* Support Network Config.
* Seperate Node Management.
* Easily to Scale (create replica and load balancing), health check.
* Config management for deployment.

### Kubernetes Features

* Service Discovery and Load Balancer
* Storage Orchestration
* Automated Rollouts and Rollbacks 
* Automated bin packing (let you define how much CPU and memory (RAM) you need for a container)
* Self-healing
* Secret and Config Management.

### Kubernetes vs Docker

Docker and Kubernetes share almost the same concept although Kubernetes has been dominated to offer more features and deployment focusion which more people will use it to deployment. Docker is efficient in setting up development environment because it has simple concept and easier to get started. 

1. Application Build Process

Both do not directly offering this, but via others tools/ cli.

2. Scaling

Docker offer services to automatically create replicas and deploy load balance, restart.
Kubernetes offers replicas, load balance, restart, health check, Rollouts and Rollbacks.
