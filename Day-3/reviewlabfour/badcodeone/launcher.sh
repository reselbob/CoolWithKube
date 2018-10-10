#!/usr/bin/env bash
#use the minikube Docker daemon
eval $(minikube docker-env)build
#build the Docker image
docker build -t badcodeone:v1

echo "$(minikube ip) badcode.one" | sudo tee -a /etc/hosts

#Turn on the minikube ingress
minikube addons enable ingress