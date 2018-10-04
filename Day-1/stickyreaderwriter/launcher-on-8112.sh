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
#create the deployment
kubectl apply -f sticky-deployment.yaml


#get into the pod/container
kubectl exec -it stickyreaderwriter_A_GUID -- /bin/bash
curl localhost:8112
# get out
exit

#Go into Minikube and take a look the volume
minikube ssh
ls /mnt/data

#boost the replicas by editing the YAML
kubectl edit deployments/stickyreaderwriter
#search for, replicas: 1 under 'spec' and change to, replicas: 4

#wait while the pods generate then pick a new pod and go in
kubectl get pod
kubectl exec -it stickyreaderwriter_A_GUID -- /bin/bash
#generate some data
curl localhost:8112
#leave
exit

#add an independent pod
kubectl apply -f sticky-pod.yaml

# go in to the newly added pod
kubectl exec -it stickyreaderwriter -- /bin/bash
#generate some data
curl localhost:8112

#expose the service
kubectl expose deployment stickyreaderwriter --type=NodePort

