# Dockerfile for React client

# Build react client
FROM node:10.16.0-alpine

# Working directory be app
WORKDIR /usr/app

COPY package*.json ./

###  Installing dependencies
RUN npm install --silent

# copy local files to app folder
COPY . .

EXPOSE 80

CMD ["npm","start"]

