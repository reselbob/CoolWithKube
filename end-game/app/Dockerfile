FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app
RUN npm install --only=prod

EXPOSE 3000
CMD [ "node", "app.js" ]