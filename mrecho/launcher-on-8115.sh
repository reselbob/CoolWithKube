#!/usr/bin/env bash
#use the minikube Docker daemon
eval $(minikube docker-env)build
#build the Docker image
docker build -t mrecho:v1 .
#create the deployment
kubectl run mrecho --image=mrecho:v1 --port=8115 --image-pull-policy=Never
#fire up the deployment
kubectl expose deployment mrecho --type=LoadBalancer
#try to load the service
minikube service readerwriter
