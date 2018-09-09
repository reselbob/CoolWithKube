FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies

# Bundle app source
COPY .. /usr/src/app
RUN npm install

EXPOSE 8113
CMD [ "node", "app.js" ]