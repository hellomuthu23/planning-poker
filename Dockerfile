# Stage 2: Set up the Firebase Emulator and serve the app
FROM node:20-alpine

RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy the built React app from the previous stage
COPY build /app/build 

# Expose ports for the React app and Firebase Emulator
EXPOSE 3000

# Start both the React app and Firebase Emulator
CMD ["sh", "-c", "serve -n -s build -l 3000"]
