# Page contains information about Secrets

```yaml
# Create a password 
echo -n "Password" | base64
## Output: YWRtaW4=
echo -n "HelloWorld" | base64
## Output: MWYyZDFlMmU2N2Rm

---
apiVersion: v1
kind: Secret
metadta:
    name: mysecret
type: Opaque
data: 
    username: YWRtaW4=
    password: MWYyZDFlMmU2N2Rm
stringData:
    location: BienHoa
---
```


To user Environment Variable as a secret:

```
apiVersion: v1
kind: Pod
metadata:
  name: secret-env-pod
spec:
  containers:
  - name: mycontainer
    image: redis
    env:
      - name: SECRET_USERNAME
        valueFrom:
          secretKeyRef:
            name: mysecret
            key: username
      - name: SECRET_PASSWORD
        valueFrom:
          secretKeyRef:
            name: mysecret
            key: password
  restartPolicy: Never
```