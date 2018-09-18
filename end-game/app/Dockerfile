FROM node:8

# Bundle app source
COPY . .
RUN npm install --only=prod

EXPOSE 3000
CMD [ "node", "app.js" ]