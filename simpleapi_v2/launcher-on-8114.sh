#!/usr/bin/env bash
#use the minikube Docker daemon
eval $(minikube docker-env)build
#build the Docker image
docker build -t simpleapi:v2 .
#create the deployment
kubectl run simpleapi --image=simpleapi:v2 --port=8114 --image-pull-policy=Never
#fire up the deployment
kubectl expose deployment simpleapi --type=LoadBalancer
#try to load the service
minikube service simpleapi
