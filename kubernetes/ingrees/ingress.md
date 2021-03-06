# Document about ingress in Kubernetes

## Definition

Term `ingress` in `Kubernetes` is referred to open a door for external traffic, reroute traffics and ensure connection that reach to the targeted services.

* Container Networking

Ingress helps to communicate within pod as it office an network interface to assign each container an IP which later be used to communicate together.

* Pod Networking

Network interface exists in Pod levels as well as  containers to manage both containers and networks.

`IMPORTANT`:

* All containers can communicate with all other containers without NAT - Network Address Translation
* All nodes can communicate with all containers (and vice-versa) without NAT
* The IP address that a container sees itself as, is the same IP address that others see as

## Service discovery

Services can be found using environment variables bu it's recommended to let in-cluster DNS to look up for services.
 
## Sample

### Create a Service

This sample creates a server and then assign an IP as a master cluster IP address.

```yaml
apiVersion: v1
kind: Service
metadata:
    labels:
        app: nginx
    name: nginx
spec:
    clusterIP: 100.69.175.1 // Service Virtual IP
    ports:
    - port: 8080 // Port Expose
      protocal: TCP
      targetPort: 80
    selector: // Labels used to select pods
      app: nginx
type: ClusterIP
```

Another example of creating backend service listening on port `80`:

```yaml
apiVersion: extensions/v1beta
kind: Ingress
metadata: 
  name: host-rule-ingress
spec:
  backend:
    serviceName: nginx-hello-sample
    servicePort: 80
  rules:
  - host: dibble.sh
    http:
      paths:
      - backend:
          serviceName: nginxhello-blue
          servicePort: 80
```

### Limitations of Ingress Kubernetes

* Have to manually config load banlancer
* Potential Latency loading between nodes
* Escalate cost
* Service API cannot cater for ingress traffice network

### Proxy-based Ingress Controllers (Ingress Class)

* Nginx (--ingress-class)
* Traefik (--kubernetes.ingressclass)
* Contour (--ingress-class-name)

#### Deploy multiple ingress controller

* Object config for Contour Ingress  Controllers

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: contour-ingress
  annotations:
    kubernetes.io/ingress.class: "contour"
```

### Canary Traffic

* Traekfik Example

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: traekfik-ingress
  annotations:
    traefik.ingress.kubernetes.io/services-weights:
      app: 90%
      app-canary: 10%
```

* Step 1: Create two services, one for main applications and the another for canary
* Step 2: Add service to ingress like this.

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: nginxhello
  annotations:
    traefik.ingress.kubernetes.io/service-weights:
      nginx-hello: 95%
      nginxhello-canary: 5%
spec:
  rules:
  - host: dribble.sh
    http:
      paths:
      - backend:
          serviceName: nginxhello:
          servicePort: 80
      - backend:
          serviceName: nginxhello-canary
          servicePort: 80
```

* Nginx

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: nginx-ingress
  annotations:
    nginx.ingress.kubernetes.io/canary: "true"
    nginx.ingress.kubernetes.io/canary-weight: "10"

```


