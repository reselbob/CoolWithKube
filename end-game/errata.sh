# Steps for installing kubeadm on a master
sudo apt-get update

sudo apt-get install apt-transport-https -y

#install docker
sudo apt-get install docker.io -y
sudo apt-get install -y curl apt-transport-https docker.io

#start docker
sudo systemctl start docker
sudo systemctl enable docker

#Bind to the kuberntest apt-get repo
sudo curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
echo “deb http://apt.kubernetes.io/ kubernetes-xenial main” > /etc/apt/sources.list.d/kubernetes.list

#update again
sudo apt-get update

#install kubernetes artifacts
sudo apt-get install -y kubelet kubeadm kubectl

#init kubernetes using kubeadm
sudo kubeadm init

#copy the kubernetest config file over the #HOME
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

#install the cluster role for flannel networking addon
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/bc79dd1505b0c8681ece4de4c0d86c5cd2643275/Documentation/kube-flannel.yml


