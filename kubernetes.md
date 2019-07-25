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


.. *TO BE CONTINUED*

### Documentation

This page contains information on step by step to get started with kubenetes. Follow the following guideline to easily get started and learn quickly.

#### Access Cluster

To check what cluser your're at, type this command and see what it gives us:

```
kubectl config view
```

The command will produce this sample results:

```
apiVersion: v1
clusters:
- cluster:
    certificate-authority: C:\Users\admin\.minikube\ca.crt
    server: https://172.16.10.26:8443
  name: minikube
contexts:
- context:
    cluster: minikube
    user: minikube
  name: minikube
current-context: minikube
kind: Config
preferences: {}
users:
- name: minikube
  user:
    client-certificate: C:\Users\admin\.minikube\client.crt
    client-key: C:\Users\admin\.minikube\client.key
```

Supported protocals: `HTTP -  REST API` with [`GO`](https://github.com/kubernetes/client-go#compatibility-matrix) and [`Python`](https://github.com/kubernetes-client/python) Client Base, [More](https://kubernetes.io/docs/reference/using-api/client-libraries/) 

to reserve proxy for kubenetes, run the following command:

```
kubectl proxy --port=8080
```

*1. Access the API from a Pod*


#### Authentication

*1. Service Account*

Kubernetes recommend to use their default authentication `Service Account`. Everytime user access APIServer it means that they're authorized by one of the accepted users (for example `admin` or `default`). 

* To get  a list of service account, type `kubectl get serviceAccounts`

*2. Create a Deployment*

Deployment in Kubernetes is a plan that actually run application and helps to scale with features `healthcheck`, `replicas`, `load-balancing`.

To create a deployment with `yaml`:

```
kubectl apply -f <filename.yaml>
```

To get deployments information:

```
kubectl get deployments
```

to delete deployments:

```
kubectl delete deplployment <deployment-name>
```

#### Managing Objects with Labels, Annotations, Namespaces

Labels are used to :

* Managing Services
* Managing Deployments
* Managing Scheduling

Use Case:

* Namespaces are used to group resources based on functioning, security,...
* Labels are used to group resources to be called
* Annotations are used when adding meanings and descriptions on resources.

*1. Namespaces*

Can be called `virual cluster`

* Security for Role-based Controls.
* Naming Boundary
* A resource can be in only one namespace.

To get namespace, type `kubectl get namespaces`

To create a namespace based on `yaml`:

```
cat > name-space.create.yaml >>EOF

apiVerion: v1
kind: Namespace
metadata:
    name: <new-namespace>

----
apiVersion: apps/v1
....
EOF
```

Then run `kubectl apply -f name-space.create.yaml`

or create namespace by cli:

```
kubectl create namespace `name-space`
```

To delete pods in namespace:

```
kubectl delete -all --namespace <namespace>
```

`important`: This í a different between pods and deployments.