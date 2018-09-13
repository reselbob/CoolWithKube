# Feeling Tracker #

Feeling tracker is an demonstration app that allows a user to declare a feeling of the moment from a web interface. The UI uses the associated API services to save and view data.


## Deployment
This code is intended to run in a Docker container. Check out the file, `Dockerfile` to learn the particulars.


## Environment Variables

### `CURRENT_VERSON=`
Sets the current version of the application. If you enhance this code, increment the current version up.

### `FEELING_PORT=`

Defaults to 3000

### `IS_CONTAINER_TEST=false`

Set to `true` if testing the contianerized app