#!/usr/bin/env bash
#use the minikube Docker daemon
eval $(minikube docker-env)build
#build the Docker image
docker build -t simpleapi:v2 .
#do the patch
kubectl patch deployment simpleapi -p '{"spec":{"template":{"spec":{"containers":[{"image":"simpleapi:v2","name":"simpleapi","env":[{"name":"CURRENT_VERSION","value":"v2"}]}]}}}}'

#rollback the deployment to version 1
kubectl rollout undo deployment/simpleapi
