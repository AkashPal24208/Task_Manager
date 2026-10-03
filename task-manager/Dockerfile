# Build stage 
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files 
COPY package*.json ./

# 1. Install dependencies (Crucial step for vite to be installed)
RUN npm install

# 2. Copy the rest of the project code 
COPY . .

# 3. Build the frontend app
RUN npm run build 

# Step 2: Production web server stage 
FROM nginx:alpine

# Custom Nginx configuration copy karein (Routing fix ke liye)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy react production build from previous stage to Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Command to run NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]