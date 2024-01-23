# Use an official Node runtime as a parent image
FROM node:14-alpine
 
# Set the working directory in the container
WORKDIR /app
 
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
 
# Install app dependencies
RUN npm install
 
# Copy the current directory contents into the container at /app
COPY . .
 
# Make port 3000 available to the world outside this container
EXPOSE 3000
 
# Define environment variable
ENV REACT_APP_BASE_URL=http://localhost:8082/api
 
# Run npm start when the container launches
CMD ["npm", "start"]
