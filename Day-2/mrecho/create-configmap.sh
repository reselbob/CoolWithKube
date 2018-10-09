#!/usr/bin/env bash
#create the config map from the command line
kubectl create configmap mrecho --from-literal='APP_NAME=Ms-Echo,ECHO=Beware'
