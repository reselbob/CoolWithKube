#!/usr/bin/env bash
#use the minikube Docker daemon
eval $(minikube docker-env)build
#build the Docker image
docker build -t feelingtracker:v1 . # !/usr/bin/env bash

