#!/usr/bin/env bash
#Go into the minikube ssh and add the directory, /mnt/data

#Go back to kubectl command line

#Build the persistent volume
kubectl apply -f sticky-pv.yaml
#Build the persistent volume claim
kubectl apply -f sticky-pvc.yaml
#use the minikube Docker daemon
eval $(minikube docker-env)build
#build the Docker image
docker build -t stickyreaderwriter:v1 .
#create the pod
#kubectl apply -f sticky-pod.yaml
#create the deployment
kubectl run stickyreaderwriter --image=stickyreaderwriter:v1 --port=8112 --image-pull-policy=Never --replicas=3
#create the service
kubectl expose deployment stickyreaderwriter --type=NodePort
#get into the pod/container
kubectl exec -it stickyreaderwriter -- /bin/bash
#in the container
curl localhost:8112
