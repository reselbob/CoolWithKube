#!/usr/bin/env bash
#use the minikube Docker daemon
eval $(minikube docker-env)build
#build the Docker image
cd ./pods/moe
docker build -t moe:v1 .

cd ../../pods/larry
docker build -t larry:v1 .

cd ../../pods/curly
docker build -t curly:v1 .

# Do the deployments
kubectl run moe --image=moe:v1 --port=8130 --image-pull-policy=Never --replicas=3
kubectl run larry --image=larry:v1 --port=8130 --image-pull-policy=Never --replicas=3
kubectl run curly --image=curly:v1 --port=8130 --image-pull-policy=Never --replicas=3
#service run

kubectl expose deployment moe --target-port=8130 --type=NodePort
kubectl expose deployment larry --target-port=8130 --type=NodePort
kubectl expose deployment curly --target-port=8130 --type=NodePort

#Turn on the minikube ingress
minikube addons enable ingress

#run the ingress(s)
kubectl appy -f https://raw.githubusercontent.com/reselbob/CoolWithKube/master/Day-2/stoogesingress/ingress.yaml



