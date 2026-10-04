#using node.js alpine image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# copy package management files 
COPY taskbackend/package*.json ./

# Install production dependency
RUN npm install

# copy the rest of the application code 
COPY taskbackend/ .

# Expose backend port parallel to app port 
EXPOSE 3000

# command to run the backend server 
CMD [ "npm","start" ]