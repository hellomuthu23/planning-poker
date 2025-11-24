FROM node:lts-alpine3.21

# https://www.npmjs.com/package/serve
RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy the built app (Vite output is `dist/`)
COPY dist /app/dist

# Expose port for the static server
EXPOSE 3000

# Start the app
CMD ["sh", "-c", "serve -n -s dist -l 3000"]