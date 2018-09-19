#!/usr/bin/env bash
#make sure you're in the miniKube context
kubectl config use-context minikube

#start the deployment
kubectl run nginx --image=nginx

#bind the service
kubectl expose deployment nginx --port 80

#add the ingress
kubectl apply -f ingress.yaml

#write to etc/hosts
echo "$(minikube ip) example.com" | sudo tee -a /etc/hosts

#make the self signed certificate
openssl req -x509 -newkey rsa:4096 -sha256 -nodes -keyout tls.key -out tls.crt -subj "/CN=example.com" -days 365

#create the secret
kubectl create secret tls example-com-tls --cert=tls.crt --key=tls.key

#update the ingress with ingress-update.yaml
kubectl apply -f ingress-update.yaml

#try to do an curl using the cert
curl --cacert tls.crt https://example.com




