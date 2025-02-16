# Use Node.js base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to cache dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend source files, including .env
COPY . .

# Set environment variables inside the container
ENV NODE_ENV=production

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
