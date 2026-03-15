# NovaTech Service Mesh: Complete API & Inter-Service Guide

This document provides a comprehensive directory of all API endpoints across the NovaTech ecosystem. It details what each endpoint does and identifies the specific pro-active orchestration points that form our service mesh.

---

## 1. Admin & User Service
**Port:** 3001 | **Base Path:** `/api/admin-users` & `/api/admin-auth`

| Category | Endpoint | Method | Functional Description | Inter-Service Call | Mesh Scenario |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Auth** | `/auth/register` | `POST` | Registers a new user account. | **Notification Service** | Triggers automated "Welcome Email" upon account creation. |
| **Auth** | `/auth/login` | `POST` | Authenticates user and returns JWT. | None | Standard login. |
| **User** | `/users/profile` | `GET` | Fetches the current user's profile. | None | Profile dashboard. |
| **User** | `/users/profile/recommendations` | `GET` | Fetches personalized suggestions. | **Product Service** | Fetches latest catalog to suggest products to the user. |
| **User** | `/users/profile/update` | `PATCH` | Updates name, bio, or profile details. | None | Profile settings. |
| **User** | `/users/address` | `POST` | Adds a new shipping address. | None | Checkout preparation. |
| **User** | `/users/address/:id` | `GET` | Fetches a specific address. | None | Shipping selection. |
| **Admin** | `/admin/users` | `GET` | Lists all registered users. | None | Admin user management. |
| **Admin** | `/admin/users/:id` | `DELETE` | Deletes a user account. | None | Content moderation. |
| **Admin** | `/admin/users/:id/role` | `PATCH` | Elevates or demotes user roles. | None | Staff permissions. |

---

## 2. Product Service
**Port:** 3002 | **Base Path:** `/api/product-products` & `/api/product-categories`

| Category | Endpoint | Method | Functional Description | Inter-Service Call | Mesh Scenario |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Catalog** | `/products` | `GET` | Lists all electronics items. | None | Storefront listing. |
| **Catalog** | `/products/:id` | `GET` | Fetches full product specs. | **Order Service** | Calls `/api/order-internal/stats/:id` to display **🔥 Trending** badge. |
| **Catalog** | `/products` | `POST` | Creates a new product (Admin Only). | None | Inventory management. |
| **Catalog** | `/products/:id` | `PATCH` | Updates price, image, or stock. | **Notification Service** | Calls `/api/notif-internal/stock-alert` if stock falls below threshold. |
| **Catalog** | `/products/:id` | `DELETE` | Removes a product. | None | End-of-life catalog cleanup. |
| **Social** | `/products/:id/reviews` | `GET` | Lists all user reviews for an item. | None | Social proof. |
| **Social** | `/products/:id/reviews` | `POST` | Submits a new product review. | None | Interactive customer feedback. |
| **Category** | `/categories` | `GET` | Lists all product categories. | None | Navigation menus. |
| **Category** | `/categories/:id` | `GET` | Fetches category details. | None | Department browsing. |
| **Internal** | `/internal/stock/check/:id` | `GET` | Validates if an item is available. | None | Pre-cart stock validation. |
| **Internal** | `/internal/stock/reduce` | `PATCH` | Reduces inventory totals. | None | Triggered by Order Service during checkout. |

---

## 3. Order Service
**Port:** 3003 | **Base Path:** `/api/order-orders` & `/api/order-cart`

| Category | Endpoint | Method | Functional Description | Inter-Service Call | Mesh Scenario |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Checkout** | `/orders/checkout` | `POST` | Finalizes orders and payments. | **Admin, Product & Notif** | 1. **Admin**: Validates profile via `/api/admin-internal/profile/:id`.<br>2. **Product**: Verifies price/stock via `/api/product-products/:id`.<br>3. **Product**: Reduces stock via `/api/product-internal/stock/reduce`.<br>4. **Notif**: Sends receipt via `/api/notif-notifications/send-email`. |
| **History** | `/orders/history` | `GET` | Lists user's past purchases. | None | Customer order history. |
| **History** | `/orders/:id` | `GET` | Fetches specific order status. | None | Order tracking. |
| **Action** | `/orders/:id/cancel` | `PATCH` | Cancels a pending order. | None | Returns items back to pool (planned). |
| **Cart** | `/cart` | `GET` | Fetches active shopping cart. | None | Persistent shopping basket. |
| **Cart** | `/cart/add` | `POST` | Adds items to the user's cart. | None | Storing purchase intent. |
| **Cart** | `/cart/:id/quantity` | `PATCH` | Adjusts item quantities. | None | Cart management. |
| **Cart** | `/cart/:id` | `DELETE` | Removes items from the cart. | None | Cart management. |
| **Admin** | `/admin/sales-report` | `GET` | Aggregated sales revenue data. | None | Executive dashboard. |
| **Internal** | `/internal/stats/:productId` | `GET` | Provides item-specific sales totals. | None | Internal source for Product "Trending" logic. |

---

## 4. Notification Service
**Port:** 3004 | **Base Path:** `/api/notif-notifications`

| Category | Endpoint | Method | Functional Description | Inter-Service Call | Mesh Scenario |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Dispatch** | `/send-email` | `POST` | Sends formal HTML emails. | **Admin Service** | Calls `/api/admin-users/profile` to resolve verified recipient email. |
| **Dispatch** | `/send-sms` | `POST` | Sends mobile text alerts. | None | Critical urgent alerts. |
| **User** | `/my-inbox` | `GET` | Fetches in-app notifications. | None | User message center. |
| **User** | `/:id/read` | `PATCH` | Marks notification as read. | None | Feedback loop. |
| **Admin** | `/admin/audit-logs` | `GET` | System-wide event audit trail. | None | Compliance and security tracking. |
| **Internal** | `/internal/log-event` | `POST` | Logs system activities. | None | Centralized logging point. |
| **Internal** | `/internal/stock-alert` | `POST` | Handles low-inventory alerts. | **Product Service** | Calls `/api/product-products/:id` to enrich alerts with item names. |

---

## 5. API Gateway (Orchestrator)
**Port:** 3000 | **Base Path:** `/api/*`
The Gateway doesn't just proxy; it maintains the **Security Context**. For every request listed above, the Gateway:
1. Validates the JWT of the incoming request.
2. Extracts the User ID and Role.
3. Injects `x-user-id` and `x-user-role` headers into the outgoing internal request.
4. Ensures that even when the Product Service calls the Order Service, the user's identity is preserved and verified at every step of the mesh.
