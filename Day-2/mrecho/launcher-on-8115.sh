#!/usr/bin/env bash
#use the minikube Docker daemon
eval $(minikube docker-env)build
#build the Docker image
docker build -t mrecho:v1 .
#create the deployment
kubectl apply -f mrecho-deployment.yaml
#fire up the deployment
kubectl expose deployment mrecho --type=NodePort
#try to load the service
minikube service mrecho
