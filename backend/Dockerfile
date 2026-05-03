# FROM node:18
FROM node:22
# Start from a base image that already has Node.js installed
WORKDIR /app
# Inside the container, everything happens in /app
COPY package*.json ./
RUN npm install
# Copy dependency files and install them
COPY . .
# Copy entire backend code into the container
EXPOSE 3000
# Tell Docker the app runs on port 3000
# CMD ["node", "src/app.js"]
CMD ["node", "src/server.js"]
# Command to start the server when the container runs