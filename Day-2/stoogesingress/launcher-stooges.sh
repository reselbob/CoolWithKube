#!/usr/bin/env bash
#use the minikube Docker daemon
eval $(minikube docker-env)build
#build the Docker image
docker build -t moe:v1 .
docker build -t larry:v1 .
docker build -t curly:v1 .

#service run

kubectl expose deployment moe --target-port=8130 --type=NodePort
kubectl expose deployment larry --target-port=8130 --type=NodePort
kubectl expose deployment curly --target-port=8130 --type=NodePort

