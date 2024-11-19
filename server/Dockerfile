# Use a Node.js base image with a compatible version
FROM node:18

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

# Log versions
RUN node -v && npm -v && pnpm -v

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]