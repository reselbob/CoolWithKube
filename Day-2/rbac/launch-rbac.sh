#!/usr/bin/env bash
# go to minikube context
kubectl config use-context minikube

#create the namespace, test
kubectl create ns test

#apply the yaml
kubectl apply -f ./manifests/test-role.yaml #the role
kubectl apply -f ./manifests/test-rolebinding.yaml #role binding

#go to MAGIC_USER context
kubectl config use-context MAGIC_USER

kubectl get pod #bad experience

#become admin again
kubectl config use-context minikube
kubectl run -n test nginx --image=nginx --replicas=2

#become MAGIC_USER
kubectl config use-context MAGIC_USER
kubectl get pod -n test #You'll only see the ones in the name space

#become admin again
kubectl config use-context minikube
kubectl apply -f ./manifests/admin-role.yaml #the role
kubectl apply -f ./manifests/admin-rolebinding.yaml #role binding


#become MAGIC_USER@minikube
kubectl config use-context MAGIC_USER@minikube
kubectl run -n test magicstuff --image=nginx --replicas=5




