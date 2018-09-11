#!/usr/bin/env bash
kubectl delete service moe
kubectl delete deployment moe

kubectl delete service larry
kubectl delete deployment lary

kubectl delete service curly
kubectl delete deployment curly

kubectl delete ingress stooges

