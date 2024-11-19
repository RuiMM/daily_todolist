# Use a Node.js base image
FROM node:16

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /server

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of your application code
COPY . .

# Install dependencies using pnpm
RUN pnpm install

# Log versions
RUN node -v && npm -v && pnpm -v