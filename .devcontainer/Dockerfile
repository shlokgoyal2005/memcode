# Use official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install PostgreSQL and the PostgreSQL client
RUN apt-get update && apt-get install -y \
    postgresql \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code, including the .env file
COPY . .

# Copy environment variables
COPY env.example.js env.js

# Expose the port the app runs on
EXPOSE 3000

# Set up environment variables
ENV NODE_ENV=development
ENV PGPASSWORD=postgres

# Initialize PostgreSQL database and user
RUN service postgresql start && \
    su - postgres -c "psql -c \"CREATE ROLE postgres WITH LOGIN PASSWORD 'postgres';\"" && \
    su - postgres -c "psql -c \"ALTER ROLE postgres WITH SUPERUSER;\"" && \
    su - postgres -c "createdb memcode"

# Start the app
CMD ["bash", "-c", "service postgresql start && make db-reset && make all"]
