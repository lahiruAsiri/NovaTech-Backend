# Deployment & Setup Guide

This guide explains how to set up and run the microservices environment locally, either individually or using Docker.

## Prerequisites
- Node.js (v18+)
- npm
- Docker & Docker Compose (optional)

## 1. Initial Setup
Run the following in the root directory:
```bash
# Install dependencies for all services
(cd api-gateway && npm install)
(cd admin-service && npm install)
(cd product-service && npm install)
(cd order-service && npm install)
(cd notification-service && npm install)

# Initialize Databases (Prisma)
(cd admin-service && npx prisma generate && npx prisma db push)
(cd product-service && npx prisma generate && npx prisma db push)
(cd order-service && npx prisma generate && npx prisma db push)
(cd notification-service && npx prisma generate && npx prisma db push)
```

## 2. Running Services Individually
Each service must be started in a separate terminal window:

- **API Gateway (Port 3000):** `cd api-gateway && npm run start:dev`
- **Admin Service (Port 3001):** `cd admin-service && npm run start:dev`
- **Product Service (Port 3002):** `cd product-service && npm run start:dev`
- **Order Service (Port 3003):** `cd order-service && npm run start:dev`
- **Notification Service (Port 3004):** `cd notification-service && npm run start:dev`

## 3. Running with Docker Compose
To start the entire cluster with one command:
```bash
docker-compose up --build
```

## 4. Environment Variables (.env)
Each folder contains a `.env` file. Key variables include:
- `PORT`: Service port.
- `JWT_SECRET`: Shared secret for token signing.
- `GATEWAY_URL`: Used by microservices to talk back to the Gateway (e.g., `http://localhost:3000`).
- `SERVICE_URLS`: Used by the Gateway to find microservices.
