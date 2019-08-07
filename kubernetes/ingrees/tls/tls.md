# Config TLS when using ingress API

`Ingress` API only supports TLS over port 443

```yaml
spec:
    tls: 
    - hosts:
      - dribble.sh
      secretName: dribble-sh-tls
    - hosts:
      - grub.io
      secretName: dribbe.sh.tls02
```

Definning an Issuer

```yaml
apiVersion: certmanager.k8s.io/v1alpha1
kind: Issuer | ClusterIssuer
metadata:
    name: letsencrypt
spec:
    acme: 
        server: https://acme-v02.api.letsencrypt.org/directory
        email: bette@dribble.sh
        privateKeyRef:
            name: acme-letsencrypt
        http01 | dns01: {}
```

to see `issuer`
```powershell
kubectl describe issuer letsencrypt
```

Acquire an certificate

```yaml
apiVersion: certmanager.k8s.io/v1alpha1
kind: Certificate
metadata:
    name: dribble-sh
spec:
    commonName: dribble.sh
    dnsName:
    - www.dribbel.sh
    secretName: dribble-sh-tls
    issuerRef:
        name: letsencrypt
        kind: ClusterIssuer | Issuer
    acme:
        config:
        - http01:
            ingressClass: nginx
```

Full Example: 

```yaml
# Create a ClusterIssuer to test the webhook works okay
cat <<EOF > test-resources.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: cert-manager-test
---
apiVersion: certmanager.k8s.io/v1alpha1
kind: Issuer
metadata:
  name: test-selfsigned
  namespace: cert-manager-test
spec:
  selfSigned: {}
---
apiVersion: certmanager.k8s.io/v1alpha1
kind: Certificate
metadata:
  name: selfsigned-cert
  namespace: cert-manager-test
spec:
  commonName: example.com
  secretName: selfsigned-cert-tls
  issuerRef:
    name: test-selfsigned
EOF

# Create the test resources
kubectl apply -f test-resources.yaml

# Check the status of the newly created certificate
# You may need to wait a few seconds before cert-manager processes the
# certificate request
kubectl describe certificate -n cert-manager-test
...
Spec:
  Common Name:  example.com
  Issuer Ref:
    Name:       test-selfsigned
  Secret Name:  selfsigned-cert-tls
Status:
  Conditions:
    Last Transition Time:  2019-01-29T17:34:30Z
    Message:               Certificate is up to date and has not expired
    Reason:                Ready
    Status:                True
    Type:                  Ready
  Not After:               2019-04-29T17:34:29Z
Events:
  Type    Reason      Age   From          Message
  ----    ------      ----  ----          -------
  Normal  CertIssued  4s    cert-manager  Certificate issued successfully

# Clean up the test resources
kubectl delete -f test-resources.yaml
```

## Installation:

Refer to: https://docs.cert-manager.io/en/latest/getting-started/install/kubernetes.html
