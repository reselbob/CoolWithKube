FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY .. /usr/src/app
COPY . .
RUN npm install

EXPOSE 8114
CMD [ "node", "app.js" ]