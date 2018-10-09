#!/usr/bin/env bash
#Create secrets at the command line
kubectl create secret generic mysecrets --from-literal='A_SECRET=apples-taste-great' --from-literal='B_SECRET=the-bee-gees-rock'
#create a secret from file. The key will be the file name
kubectl create secret generic yoursecrets  --from-file=./secrets_files/X_SECRET

#take a look at the environment variables
kubectl exec -ti simple-pod env
kubectl exec -ti intermediate-pod env

kubectl expose deployment simplesecret --target-port=80 --type=NodePort
