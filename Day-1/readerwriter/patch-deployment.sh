#!/usr/bin/env bash
#build the Docker image
docker build -t readerwriter:v2 .
#deploy it
kubectl patch deployment readerwriter -p '{"spec":{"template":{"spec":{"containers":[{"image":"readerwriter:v2","name":"readerwriter","env":[{"name":"CURRENT_VERSION","value":"v2"}]}]}}}}'