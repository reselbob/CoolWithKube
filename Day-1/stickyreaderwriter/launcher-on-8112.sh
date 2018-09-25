#!/usr/bin/env bash
#Go into the minikube ssh and add the directory, /mnt/data

#Go back to kubectl command line

#Build the persistent volume
kubectl appy -f sticky-pv.yaml
#Build the persistent volume claim
kubectl appy -f sticky-pvc.yaml
#use the minikube Docker daemon
eval $(minikube docker-env)build
#build the Docker image
docker build -t stickyreaderwriter:v1 .
#create the pod
kubectl appy -f sticky-pod.yaml
#get into the pod/container
kubectl exec -it stickyreaderwriter -- /bin/bash
#in the container
curl localhost:8112
