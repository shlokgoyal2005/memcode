# Use official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code, including the .env file
COPY . .

# Copy environment variables
COPY .env.example .env

# Expose the port the app runs on
EXPOSE 3000

# Set up environment variables
ENV NODE_ENV=development
ENV PGPASSWORD=postgres

# Start the app
CMD ["bash", "-c", "make db-reset && make all"]
