# Step 1: Build the app
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy only the necessary files for building the app
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the source code
COPY . .

# Build the app for production
RUN yarn build

# Step 2: Use Nginx to serve the app
FROM nginx:alpine

# Copy the build output to the Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
