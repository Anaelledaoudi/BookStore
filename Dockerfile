# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /BookStore

# add `/app/node_modules/.bin` to $PATH
ENV PATH /BookStore/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g 

# add app
COPY . ./

# start app
CMD ["npm", "start"]

# # syntax=docker/dockerfile:
# FROM node:12-alpine
# RUN apk add --no-cache python2 g++ make
# WORKDIR /app
# COPY . .
# RUN yarn install --production
# CMD ["node", "src/index.js"]
# EXPOSE 3000

# docker build -t bookstore .
# docker run -d -p 80:80 docker/getting-started