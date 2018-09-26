#!/usr/bin/env bash
#use the minikube Docker daemon
eval $(minikube docker-env)build
#build the Docker image
docker build -t reviewlabone:v1 .

#create the deployment

#create the service

