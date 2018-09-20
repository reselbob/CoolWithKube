#!/usr/bin/env bash
#use the minikube Docker daemon
eval $(minikube docker-env)build
#build the Docker image
docker build -t simpleapi:v1 .
#create the deployment
kubectl run simpleapi --image=simpleapi:v1 --port=8113 --image-pull-policy=Never
#fire up the deployment
kubectl expose deployment simpleapi --type=NodePort
#try to load the service
minikube service simpleapi
