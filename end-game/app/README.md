# Feeling Tracker #

Feeling tracker is an demonstration app that allows a user to declare a feeling of the moment from a web interface. The UI uses the associated API services to save and view data.


## Deployment
This code is intended to run in a Docker container. Check out the file, `Dockerfile` to learn the particulars.


## Environment Variables

### `CURRENT_VERSON=1.6`
Sets the current version of the application. If you enhance this code, increment the current version up.

### `FEELING_TRACKER_HOST=`
The PORT to run feelingTracker on. Defaults to 3000

### FEELING_TRACKER_DATA_DIR
The directory into which the feeling tracker data files are to be stored. The default is to ../feelingTracker/data/ . When using a Kubenetes Pod with a Persistent Volume Claim, you can config the `PVC` like so:

`FEELING_TRACKER_DATA_DIR = /mydata`

The pod manifest:

``` YAML

---
kind: Pod
apiVersion: v1
metadata:
  name: feelingtracker
spec:
  volumes:
    - name: feelingtracker-pv-storage
      persistentVolumeClaim:
       claimName: feelingtracker-pv-claim
  containers:
    - name: feelingtracker
      image: feelingtracker:v1
      imagePullPolicy: Always
      ports:
        - containerPort: 3000
          name: "http-server"
      volumeMounts:
        - mountPath: "/mydata"
          name: feelingtracker-pv-storage

```
