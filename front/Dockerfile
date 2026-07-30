# syntax=docker/dockerfile:1.7

# ---- Stage 1: builder ----
FROM node:20-alpine AS builder
#   - Set the working directory
WORKDIR /app


#   - Install all dependencies
COPY package.json package-lock.json ./
RUN npm ci

#   - Copy the source code
COPY . .

#   - Declare a build argument VITE_API_URL and expose it as an env var
#Значение аргумента подставит команда в make build-front
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

#   - Run the production build (static files go to dist/)
RUN npm run build



# ---- Stage 2: nginx runtime ----
FROM nginx:alpine AS runtime
USER node
#   - Copy the built static files from the builder stage to nginx's html dir
COPY --from=builder /app/dist /usr/share/nginx/html
#   - Copy the custom nginx.conf into /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/conf.d/default.conf

#   - EXPOSE port 80 and run nginx in the foreground
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
