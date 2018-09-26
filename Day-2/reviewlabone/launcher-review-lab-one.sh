#!/usr/bin/env bash
cd app
#use the minikube Docker daemon
eval $(minikube docker-env)build
#build the Docker image
docker build -t reviewlabone:v1 .

#create the deployment

#create the service

#prove it all works

