#!/usr/bin/env bash
#As Requester
mkdir -p ~/.certs/kubernetes/minikube

cd ~/.certs/kubernetes/minikube/

openssl genrsa -out MAGIC_USER.key 2048

openssl req -new -key MAGIC_USER.key -out /tmp/MAGIC_USER.csr -subj "/CN=MAGIC_USER/O=devs/O=tech-lead"

#As Admin

openssl x509 -req -in /tmp/MAGIC_USER.csr -CA ~/.minikube/ca.crt -CAkey ~/.minikube/ca.key -CAcreateserial -out ~/.certs/kubernetes/minikube/MAGIC_USER.crt -days 500

kubectl config set-credentials MAGIC_USER@minikube --client-certificate="$HOME/.certs/kubernetes/minikube/MAGIC_USER.crt" --client-key="$HOME/.certs/kubernetes/minikube/MAGIC_USER.key" --embed-certs=true

kubectl config set-context MAGIC_USER@minikube --cluster=minikube --user=MAGIC_USER@minikube

kubectl config use-context MAGIC_USER@minikube