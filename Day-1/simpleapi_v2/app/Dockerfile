FROM node:8

# Bundle app source
COPY . .
RUN npm install

EXPOSE 8113
CMD [ "node", "app.js" ]