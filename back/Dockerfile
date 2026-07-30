# syntax=docker/dockerfile:1.7

# ---- Stage 1: builder ----
FROM node:20-alpine AS builder

#   - Set the working directory
WORKDIR /app

#   - Install all dependencies (including dev deps needed to compile)
COPY package*.json ./
RUN npm ci

#   - Copy TypeScript config files (tsconfig*.json, nest-cli.json) and the src/ folder
COPY tsconfig*.json nest-cli.json ./
COPY src ./src

#   - Run the production build (compile TS into dist/)
RUN npm run build
RUN npm prune --omit=dev

# ---- Stage 2: runtime ----
FROM node:20-alpine AS runtime
USER node
#   - Set the working directory
WORKDIR /app

#   - Set NODE_ENV=production
ENV NODE_ENV=production

#   - Install only production dependencies
#   - Copy the compiled dist/ from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

#   - EXPOSE the app port and start the server (node dist/main.js)
EXPOSE 3000
CMD ["node", "dist/main.js"]
