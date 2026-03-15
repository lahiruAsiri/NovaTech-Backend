# Comprehensive API Catalog

This document provides a full reference of all available endpoints in the CTSE Cloud Computing system, all accessible through the API Gateway (**Port 3000**).

---

## 🔐 Administrative & User APIs (Admin & User Service)

### Authentication
**Base Path**: `api/admin-auth`

- **Register User** (`POST /register`)
  ```bash
  curl -X POST http://localhost:3000/api/admin-auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123", "name": "John Doe", "role": "USER"}'
  ```
- **Login** (`POST /login`)
  ```bash
  curl -X POST http://localhost:3000/api/admin-auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
  ```

### User Profile
**Base Path**: `api/admin-users`

- **Get Profile** (`GET /profile`)
  ```bash
  curl http://localhost:3000/api/admin-users/profile -H "Authorization: Bearer <TOKEN>"
  ```
- **Update Profile** (`PUT /profile`)
  ```bash
  curl -X PUT http://localhost:3000/api/admin-users/profile \
  -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" \
  -d '{"name": "John Updated"}'
  ```
- **Get Addresses** (`GET /addresses`)
  ```bash
  curl http://localhost:3000/api/admin-users/addresses -H "Authorization: Bearer <TOKEN>"
  ```
- **Add Address** (`POST /addresses`)
  ```bash
  curl -X POST http://localhost:3000/api/admin-users/addresses \
  -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" \
  -d '{"street": "123 Main St", "city": "Colombo"}'
  ```

### System Administration
**Base Path**: `api/admin-admin`

- **List All Users** (`GET /`)
  ```bash
  curl http://localhost:3000/api/admin-admin/ -H "Authorization: Bearer <ADMIN_TOKEN>"
  ```
- **Get User Info** (`GET /:id`)
  ```bash
  curl http://localhost:3000/api/admin-admin/1 -H "Authorization: Bearer <ADMIN_TOKEN>"
  ```
- **Update Role** (`PATCH /:id/role`)
  ```bash
  curl -X PATCH http://localhost:3000/api/admin-admin/1/role \
  -H "Authorization: Bearer <ADMIN_TOKEN>" -H "Content-Type: application/json" \
  -d '{"role": "ADMIN"}'
  ```

---

## 📦 Products & Catalog (Product Service)

### Products
**Base Path**: `api/product-products`

- **List All** (`GET /`)
  ```bash
  curl http://localhost:3000/api/product-products/
  ```
- **Get Detail** (`GET /:id`)
  ```bash
  curl http://localhost:3000/api/product-products/1
  ```
- **Create Product** (`POST /`)
  ```bash
  curl -X POST http://localhost:3000/api/product-products/ \
  -H "Authorization: Bearer <ADMIN_TOKEN>" -H "Content-Type: application/json" \
  -d '{"name": "Laptop", "price": 1200, "categoryId": 1, "stock": 50}'
  ```
- **Update Product** (`PUT /:id`)
  ```bash
  curl -X PUT http://localhost:3000/api/product-products/1 \
  -H "Authorization: Bearer <ADMIN_TOKEN>" -H "Content-Type: application/json" \
  -d '{"price": 1150}'
  ```
- **Add Review** (`POST /:id/reviews`)
  ```bash
  curl -X POST http://localhost:3000/api/product-products/1/reviews \
  -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" \
  -d '{"rating": 5, "comment": "Great!"}'
  ```

### Categories
**Base Path**: `api/product-categories`

- **List Categories** (`GET /`)
  ```bash
  curl http://localhost:3000/api/product-categories/
  ```
- **Create Category** (`POST /`)
  ```bash
  curl -X POST http://localhost:3000/api/product-categories/ \
  -H "Authorization: Bearer <ADMIN_TOKEN>" -H "Content-Type: application/json" \
  -d '{"name": "Home Appliances"}'
  ```

### Internal Operations
**Base Path**: `api/product-internal`

- **Reduce Stock** (`PATCH /stock/reduce`)
  *Used by Order Service during checkout.*

---

## 🛒 Orders & Cart (Order Service)

### Shopping Cart
**Base Path**: `api/order-cart`

- **View Cart** (`GET /`)
  ```bash
  curl http://localhost:3000/api/order-cart/ -H "Authorization: Bearer <TOKEN>"
  ```
- **Add Item** (`POST /add`)
  ```bash
  curl -X POST http://localhost:3000/api/order-cart/add \
  -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 1}'
  ```
- **Remove Item** (`DELETE /:id`)
  ```bash
  curl -X DELETE http://localhost:3000/api/order-cart/1 -H "Authorization: Bearer <TOKEN>"
  ```

### Orders
**Base Path**: `api/order-orders`

- **Checkout** (`POST /checkout`)
  ```bash
  curl -X POST http://localhost:3000/api/order-orders/checkout -H "Authorization: Bearer <TOKEN>"
  ```
- **History** (`GET /history`)
  ```bash
  curl http://localhost:3000/api/order-orders/history -H "Authorization: Bearer <TOKEN>"
  ```
- **Cancel** (`PATCH /:id/cancel`)
  ```bash
  curl -X PATCH http://localhost:3000/api/order-orders/1/cancel -H "Authorization: Bearer <TOKEN>"
  ```

### Order Administration
**Base Path**: `api/order-admin`

- **List All Orders** (`GET /`)
  ```bash
  curl http://localhost:3000/api/order-admin/ -H "Authorization: Bearer <ADMIN_TOKEN>"
  ```
- **Update Status** (`PATCH /:id/status`)
  ```bash
  curl -X PATCH http://localhost:3000/api/order-admin/1/status \
  -H "Authorization: Bearer <ADMIN_TOKEN>" -H "Content-Type: application/json" \
  -d '{"status": "SHIPPED"}'
  ```

---

## 🔔 Notifications & Audit (Notification Service)

### Notifications
**Base Path**: `api/notif-notifications`

- **My Inbox** (`GET /my-inbox`)
  ```bash
  curl http://localhost:3000/api/notif-notifications/my-inbox -H "Authorization: Bearer <TOKEN>"
  ```
- **Mark As Read** (`PATCH /:id/read`)
  ```bash
  curl -X PATCH http://localhost:3000/api/notif-notifications/1/read -H "Authorization: Bearer <TOKEN>"
  ```

### Templates
**Base Path**: `api/notif-templates`

- **Get Template** (`GET /:type`)
  ```bash
  curl http://localhost:3000/api/notif-templates/WELCOME
  ```

### System Audits
**Base Path**: `api/notif-admin`

- **Audit Logs** (`GET /audit-logs`)
  ```bash
  curl http://localhost:3000/api/notif-admin/audit-logs -H "Authorization: Bearer <ADMIN_TOKEN>"
  ```
