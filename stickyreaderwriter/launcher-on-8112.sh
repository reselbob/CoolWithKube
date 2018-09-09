#!/usr/bin/env bash
#use the minikube Docker daemon
eval $(minikube docker-env)build
#build the Docker image
docker build -t stickyreaderwriter:v1 .
#create the pod
kubecrl appy -f sticky-pod.yaml
#get into the pod/container
kubectl exec -it stickyreaderwriter -- /bin/bash
#in the container
curl localhost:8112
