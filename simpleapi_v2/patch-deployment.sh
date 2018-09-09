#!/usr/bin/env bash
kubectl patch deployment simpleapi -p '{"spec":{"template":{"spec":{"containers":[{"image":"simpleapi:v2","name":"simpleapi","env":[{"name":"CURRENT_VERSION","value":"v2"}]}]}}}}'