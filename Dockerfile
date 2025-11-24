# ==========================================
# Stage 1: Build the React Application
# ==========================================
FROM node:lts-alpine3.22 AS builder

# Set working directory
WORKDIR /app

# Copy package files to install dependencies first (caching optimization)
COPY package.json package-lock.json ./

# Install dependencies (use 'npm ci' for deterministic builds)
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the Vite application
# This usually outputs to the /dist folder
RUN --mount=type=secret,id=myenv,target=/app/.env npm run build

# ==========================================
# Stage 2: Serve with Nginx
# ==========================================
FROM nginx:alpine AS production

# Copy the custom Nginx configuration (see step 2 below)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built artifacts from the builder stage to Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
