#!/usr/bin/env bash
#Create a Docker image based on the code in ./app

#Choose three colors, for example: red, green, yellow

#Create three services based on the colors you selected

#Make is so that the each service binds to a pod that holds a container that runs
#a node serer that return the json,
# {color: color, ProcessId: process.pid, APIVersion: vers, createTime: new Date()}

# WHERE color describes the color of the

#use the minikube Docker daemon
eval $(minikube docker-env)build
#build the Docker image
docker build -t colors:v1 .


echo "$(minikube ip) colors.all red.clr green.clr yellow.clr" | sudo tee -a /etc/hosts

#Turn on the minikube intgress
minikube addons enable ingress
