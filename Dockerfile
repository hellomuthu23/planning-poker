# Stage 2: Set up the Firebase Emulator and serve the app
FROM node:20-alpine

RUN apk add --no-cache openjdk17

# Install Firebase CLI
RUN npm install -g firebase-tools serve

# Set the working directory
WORKDIR /app

# Copy the built React app from the previous stage
COPY build /app/build 

# Copy the Firebase Emulator files (downloaded beforehand)
COPY firebase-emulators /app/firebase-emulators

COPY firebase.json /app/firebase.json

# Expose ports for the React app and Firebase Emulator
EXPOSE 8080
EXPOSE 4000
EXPOSE 3000

# Start both the React app and Firebase Emulator
CMD ["sh", "-c", "firebase emulators:start --only firestore --project demo & REACT_APP_USE_EMULATOR=true & npx serve -s build -l 3000"]