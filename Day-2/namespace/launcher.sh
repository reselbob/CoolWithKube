#!/usr/bin/env bash
# go to minikube context
kubectl config use-context minikube

#create the namespace, test
kubectl create ns cool-kubes

#take a look at the namespaces
kubectl get ns

#create a deployment in cool-kubes
kubectl run -n cool-kubes nginx --image=nginx --replicas=2

#take a look at deployments
kubectl get deployment

#take a look at deployments again, using the namespace
kubectl get deployment -n cool-kubes

#take a look at 'em all
kubectl get deployment --all-namespaces

#clean up
kubectl delete deployment  nginx -n cool-kubes
kubectl delete ns cool-kubes





