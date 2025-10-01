FROM registry.redhat.io/ubi8/nodejs-12

# Set working directory
WORKDIR /opt/app-root/src

# Copy package files first for better layer caching
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application files
COPY server.js ./

# Use non-root user (already configured in base image)
USER 1001

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
