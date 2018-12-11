sudo kubeadm reset
sudo apt-get purge kubeadm kubectl kubelet kubernetes-cni kube*
sudo apt-get autoremove
sudo rm -f /home/ubuntu/.kube/config
sudo rm -rf  /var/lib/etcd/member/snap
sudo rm -rf  /var/lib/etcd/member/wal

sudo reboot

