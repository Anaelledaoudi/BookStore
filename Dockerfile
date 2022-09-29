# pull official base image
FROM node:13.12.0-alpine
ENV NODE_ENV production
# set working directory
WORKDIR /BookStore

# add `/app/node_modules/.bin` to $PATH
ENV PATH /BookStore/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g 
RUN npm install --production
RUN npm build
# add app
COPY . ./

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /BookStore/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
# Expose port
# EXPOSE 3000

# # start app
# CMD ["npm", "start"]

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