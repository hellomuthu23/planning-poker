# Stage 2: Serve the app
FROM node:lts-alpine3.21

# https://www.npmjs.com/package/serve
RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy the built React app from the previous stage
COPY build /app/build

# Expose port for the React app
EXPOSE 3000

# Start the React app
CMD ["sh", "-c", "serve -n -s build -l 3000"]