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

export KOPPER_NAME=kopper_xx
export KOPPER_DNS_NAME=domain.xx

aws iam create-user --user-name ${KOPPER_NAME} #kops

aws iam add-user-to-group --user-name ${KOPPER_NAME} --group-name kops

#Create the access key for this user
aws iam create-access-key --user-name ${KOPPER_NAME}

#register a DNS, dnsname.xx

#create a bucket to hold cluster config data
aws s3 mb s3://clusters.${KOPPER_DNS_NAME}-state

#store state in env var
export KOPS_STATE_STORE=s3://clusters.${KOPPER_DNS_NAME}-state

#config the cluster
kops create cluster --zones=us-west-1a uswest1.${KOPPER_DNS_NAME} --master-size="t2.micro" --node-size="t2.micro" --node-count="3"

(ssh-keygen -t rsa -b 2048) #if you need to create the ssh key

#create a secret based on the key
kops create secret --name uswest1.${KOPPER_DNS_NAME} sshpublickey admin -i ~/.ssh/id_rsa.pub

#physically create it
kops update cluster uswest1.${KOPPER_DNS_NAME} --yes

#delete
kops delete cluster uswest1.${KOPPER_DNS_NAME} --yes

#Dashboard url templage
https://api.<custername>/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/#!/login
