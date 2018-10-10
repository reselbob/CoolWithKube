# Bad Code One, Part 1

## The Challenge

The project, `BadCodeOne` is designed to be a deployment -> service -> ingress release. That's the intention, but there is a problem as you'll discover.

The challenge at hand is to findout what's wrong with the project, and then fix it.

Here are the steps to take to start out:

First, make sure you've told kubernetes to inspect the local minikube docker environment to get Docker images. Thus, the command:

`eval $(minikube docker-env)build`

Then go to the `./badcodeone/app` directory to create the Docker image:

`docker build -t badcodeone:v1 .`

Next, create a domain name local to your computer named, `badcode.one` by writing to the file `/etc/hosts`.

`echo "$(minikube ip) badcode.one" | sudo tee -a /etc/hosts`

Also you'll need to make sure that the minikube ingress controller is running. Use the command:

`minikube addons enable ingress`

At this point you should have the Docker Image and the Domain Name you're going to support. Now the tasks that remain are to create the `deployment`, the `service` and the `ingress`.

The files of interest are 

* `badcodeone-deployment.yaml`
* `badcodeone-service.yaml`
* `badcodeone-ingress.yaml`

Those familiar with basic Kubernetes have seen this pattern before. But, there is a problem with the code, which will start to appear when you try to create the deployment. (Hint: It has to do with namespaces.)

After you fix the deployment, mostly like the problem will cascade to the service and probably to the ingress as well. (Remember, once dedicate the deployment to a given namespace, it will be visible only to other objects in that namespace.)

Here's a suggestion. Don't try to fix everything all at once. See how the problems manifest themselves. The benefit of allowing the code to fail is that you can use the experience as a reference when you have similar problems in the future.

# Bad Code One, Part 2

After you fix the code, make a helm chart using the refactored deployment, service and ingress files.

Remember, the structure of a helm chart is:

```$xslt
helm_chart_dir
 |- Chart.yaml
 |- templates
      |- deployment.yaml
      |- service.yaml
      |- ingress.yaml

```

If you want to use `values.yaml` to make the templates support variable values, feel free.

Once you, have the helm chart built, you deploy it using the command

`helm install helm_chart_dir`




