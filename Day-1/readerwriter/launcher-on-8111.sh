#!/usr/bin/env bash
#use the minikube Docker daemon
eval $(minikube docker-env)build
#build the Docker image
docker build -t readerwriter:v1 .
#create the deployment
kubectl run readerwriter --image=readerwriter:v1 --port=8111 --image-pull-policy=Never --replicas=3
#fire up the deployment
kubectl expose deployment readerwriter --type=LoadBalancer
#try to load the service
minikube service readerwriter
