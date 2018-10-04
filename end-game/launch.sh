#!/usr/bin/env bash
#use the minikube Docker daemon
eval $(minikube docker-env)build
#build the Docker image
docker build -t feelingtracker:v1 . # !/usr/bin/env bash

#from docker
docker build -t reselbob/feelingtracker:latest . # !/usr/bin/env bash
