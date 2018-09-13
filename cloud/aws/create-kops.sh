#!/usr/bin/env bash
# this assumes that you have an AWS Admin user configured with
export AWS_ACCESS_KEY_ID=yourAWSaccesskeyID
export AWS_SECRET_ACCESS_KEY=yourAWSSecretAccessKey


#set things up on
aws iam create-group --group-name kops

aws iam attach-group-policy --policy-arn arn:aws:iam::aws:policy/AmazonEC2FullAccess --group-name kops

aws iam attach-group-policy --policy-arn arn:aws:iam::aws:policy/AmazonRoute53FullAccess --group-name kops

aws iam attach-group-policy --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess --group-name kops

aws iam attach-group-policy --policy-arn arn:aws:iam::aws:policy/IAMFullAccess --group-name kops

aws iam attach-group-policy --policy-arn arn:aws:iam::aws:policy/AmazonVPCFullAccess --group-name kops

aws iam create-user --user-name kops

aws iam add-user-to-group --user-name kops --group-name kops

#Create the access key for this user
aws iam create-access-key --user-name kops


#register a DNS, dnsname.xx

#create a bucket to hold cluster config data
aws s3 mb s3://clusters.your.dnsname.xx

#store state in env var
export KOPS_STATE_STORE=s3://clusters.your.dnsname.xx

#config the cluster
kops create cluster --zones=us-west-1a useast1.your.dnsname.xx

#physically create it
kops update cluster useast1.your.dnsname.xx --yes

#delete
kops delete cluster useast1.your.dnsname.xx --yes

#Dashboard url templage
https://api.<custername>/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/#!/login