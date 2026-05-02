# --- STAGE 1: BUILD ---
FROM node:20-slim AS builder

RUN apt-get update && apt-get install -y openssl libssl-dev && rm -rf /var/lib/apt/lists/*
WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .

# Generate Prisma Client and build JS
RUN npx prisma generate
RUN npm run build

# --- STAGE 2: RUNTIME ---
FROM node:20-slim

RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /usr/src/app

# Copy compiled code and node_modules from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 3003
CMD ["npm", "run", "start:prod"]
