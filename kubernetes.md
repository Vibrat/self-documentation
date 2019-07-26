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
* `Yaml Config` for serviceAccounts is `spec.serviceAccountName`.
* To opt out from automated serviceAccount, set `automountServiceAccountToken: false`, below is an example:

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: build-robot
automountServiceAccountToken: false
...
```

##### How Service Account work

Every namespace has a `default` service account named `default`. 

To create a `Service Account`, apply this config file.

```
kubectl apply -f <<EOF

apiVersion: v1
kind: ServiceAccount
metadata:
  name: <new-name-service-account>
...
EOF
```

To check if the `new Service Account` is created, 

```
kubectl get serviceAccounts/<new-name-service-account> -o yaml
```

The output will be like:

```
apiVersion: v1
kind: ServiceAccount
metadata:
  creationTimestamp: 2015-06-16T00:12:59Z
  name: build-robot
  namespace: default
  resourceVersion: "272500"
  selfLink: /api/v1/namespaces/default/serviceaccounts/build-robot
  uid: 721ab723-13bc-11e5-aec2-42010af0021e
secrets:
- name: build-robot-token-bvbk5
```

To delete a `Service Account`,

```
kubectl delete serviceAccounts/<service-account-name>
```

To create a `sercret` for serviceAccounts:

```
kubectl apply -f - <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: build-robot-secret
  annotations:
    kubernetes.io/service-account.name: build-robot
type: kubernetes.io/service-account-token
EOF
```

To describe secret

```
kubectl describe secrets/build-robot-secret
```

Output will be like: 

```
Name:           build-robot-secret
Namespace:      default
Labels:         <none>
Annotations:    kubernetes.io/service-account.name=build-robot
                kubernetes.io/service-account.uid=da68f9c6-9d26-11e7-b84e-002dc52800da

Type:   kubernetes.io/service-account-token

Data
====
ca.crt:         1338 bytes
namespace:      7 bytes
token:          ...
```
 
*Permissions Adding*

To grant only `view` permission to service account `my-sa` within namepsace `my-namespace`

```
kubectl create rolebinding my-sa-view \
  --clusterrole=view \
  --serviceaccount=my-namespace:my-sa \
  --namespace=my-namespace
```

To grant a group permissions for a namespace:

```
kubectl create rolebinding serviceaccounts-view \
  --clusterrole=view \
  --group=system:serviceaccounts:my-namespace \
  --namespace=my-namespace
```

to grant `super` access permissions to all account in `Service Account`: 

```
kubectl create clusterrolebinding serviceaccounts-cluster-admin \
  --clusterrole=cluster-admin \
  --group=system:serviceaccounts
```

to grant permissions to a `namespace`:

```
kubectl create clusterrolebinding serviceaccounts-view \
  --clusterrole=view \
 --group=system:serviceaccounts
```

##### Using RBAC Authorization

* Step 1: Create Role/ Cluster Role:

```
# Create a Role and give Core API, permissions: get, watch, list
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""] # "" indicates the core API group
  resources: ["pods"]
  verbs: ["get", "watch", "list"]


# Create a cluster role to access to secrets resource
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  # "namespace" omitted since ClusterRoles are not namespaced
  name: secret-reader
rules:
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get", "watch", "list"]

```

* Step 2: Add user to Role or ClusterRole:

```
# Add user to role
apiVersion: rbac.authorization.k8s.io/v1
# This role binding allows "jane" to read pods in the "default" namespace.
kind: RoleBinding
metadata:
  name: read-pods
  namespace: default
subjects:
- kind: User
  name: jane # Name is case sensitive
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role #this must be Role or ClusterRole
  name: pod-reader # this must match the name of the Role or ClusterRole you wish to bind to
  apiGroup: rbac.authorization.k8s.io

# Add user to a cluster role
apiVersion: rbac.authorization.k8s.io/v1
# This role binding allows "dave" to read secrets in the "development" namespace.
kind: RoleBinding
metadata:
  name: read-secrets
  namespace: development # This only grants permissions within the "development" namespace.
subjects:
- kind: User
  name: dave # Name is case sensitive
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: secret-reader
  apiGroup: rbac.authorization.k8s.io
```

to grant permissions to a group use `ClusterRoleBinding`:

```
apiVersion: rbac.authorization.k8s.io/v1
# This cluster role binding allows anyone in the "manager" group to read secrets in any namespace.
kind: ClusterRoleBinding
metadata:
  name: read-secrets-global
subjects:
- kind: Group
  name: manager # Name is case sensitive
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: secret-reader
  apiGroup: rbac.authorization.k8s.io
```

*Important*: To change which `Role` or `ClusterRole` an object is binding to, please delete and create a new similar object.

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
kubectl delete deployment <deployment-name>
```

#### Managing Objects with Labels, Annotations, Namespaces

*1. Labels*

Labels are used to :

* Managing Services
* Managing Deployments
* Managing Scheduling

Use Case:

* Namespaces are used to group resources based on functioning, security,...
* Labels are used to group resources to be called
* Annotations are used when adding meanings and descriptions on resources.

__Using Labels for Services, Deployment__

To add labels to pods, apply `yaml` file config as follows:

```
apiVersion: v1
kind: Pod
metadata:
  name: <namespace>
  labels:
    <key-label>: <value-label>
```

```
kubectl apply -f <file.yaml>
```

To get pods filtered by `labels`:


```
# Query by one label
kubectl get pods -l <label-key>=<label-value> --show-label
kubectl get pods --selector <label-key>=<label-value> --show-label

# Query by multiple labels
kubectl get pods -l "<label-key>=<label-value>,<lable-key>=<label-value>,..." --show-label
```

To edit existing labels in pod:

```
# Replace an existing labels
kubectl label pod <pod-name> <label-key>=<label-value> --overwrite

# Add new labels
kubectl label pod <pod-name> <label-key>=<label-value>

# Label all
kubectl label pod --all <label-key>=<label-value>
```

*2. Namespaces*

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

*3. Controllers*

Controller has a concept named `ReplicaSet` to define numbers of stable pods in running time. this will be used to maintain numnber of stable idential pods at a given time.

* ReplicaSet

ReplicaSet is managed by Deployment, which provide an efficient ways to deployment multiple instances of applications. ReplicaSet is define in pods by specifing `metadata.ownerReferences`

__The main benefits of `ReplicaSet` is that it ensures a number of instances will be maintained at a given time.__


* Pod

Pod is like a unit container that can run one or multiple application which is managed by cluster.

To get pod and theirs IPs.

```
kubectl get pod -o wide
```

```
kubectl describe endpoints <pod-name>
```

To access a pod in bash

```
kubectl exec -it <pod-name> --container <container-name> -- /bin/bash/
```

Forward port 

```
## `&` here mean try to run in iteractive mode
kubectl port-forward <pod-name> <external-port>:<internal-port> &
```

* Configuration and Data Persistences are managed externally.
```
fb - bring process to foreground
```

Status of Pod

```
A Pod is considered ready when all containers are ready
```


`Pod Health`: 
Liveliness: Check to restart containers.
Readiness: Check live application and remove container from load-balance.
Exec (Exit code), tcpSocket (connection successful), httpGet (Code 200,...)

```
kubectl get event --watch &
```