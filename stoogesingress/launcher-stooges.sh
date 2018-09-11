#!/usr/bin/env bash
#use the minikube Docker daemon
eval $(minikube docker-env)build
#build the Docker image
docker build -t moe:v1 .
docker build -t larry:v1 .
docker build -t currly:v1 .

