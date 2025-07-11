# Use official Node.js 18 image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Ensure devDependencies like nodemon are installed
ENV NODE_ENV=development

# Install dependencies (express, mongoose, etc.)
RUN npm install --include=dev

# Copy rest of the application
COPY . .

# Expose the backend port
EXPOSE 5001

# Start server
CMD ["npm", "run", "dev"]
