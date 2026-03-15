# NovaTech Microservices: Full Inter-Service Dependency Map

This document provides a complete overview of how all microservices in the NovaTech system interact. In a true microservices architecture, services often fulfill specific "Active" or "Passive" roles during a transaction.

---

## 🗺️ The Connection Map

Every service in NovaTech is connected via the **API Gateway**, but they each have unique relationship types:

### 1. The Active Orchestrators (Initiators)
These services proactively "ask" other services for information or trigger actions in them.

*   **Order Service**: 
    - **Calls Admin Service**: Validates user profiles and shipping addresses.
    - **Calls Product Service**: Verifies current prices and reduces stock levels.
    - **Calls Notification Service**: Triggers order confirmation emails.
*   **Product Service**:
    - **Calls Notification Service**: Automatically triggers a `stock-alert` when inventory for any product falls below **10 units**.

### 2. The Passive Providers (Responders)
These services focus on managing their own data and only act when called upon by others.

*   **Admin Service**:
    - **Role**: Provides authoritative user identity and role data. It does not call any other service; it only "replies" to the Gateway and Order service.
*   **Notification Service**:
    - **Role**: A "Sink" service. It collects messages from the Order and Product services and delivers them to the user. It does not initiate any calls to other microservices.

---

## 🌊 Complete Real-World Flow: The "Low Stock" Sale

Here is a scenario involving **three** services working together without the user even knowing:

1.  **User Action**: A user buys the last 5 units of a "Smart Watch" via the **Order Service**.
2.  **Order -> Product (Stock Reduce)**: The Order service successfully finishes the checkout and tells the **Product Service** to reduce the stock.
3.  **Product -> Notification (Internal Alert)**: The Product service updates its database. It realizes the stock is now only **3 units** (below the threshold of 10).
4.  **Notification (Email/Log)**: The Product service immediately calls the **Notification Service** internal endpoint. The Notification service then logs an audit trail and sends an alert to the Admin dashboard.

---

## 🛠️ Summary of Cross-Service Endpoints

If you are looking at the code, here are the "Internal" routes designed specifically for this communication:

| Call Direction | Endpoint Used | Purpose |
| :--- | :--- | :--- |
| **Order -> Admin** | `GET /api/admin-internal/profile/:id` | Check if user is "Checkout Ready" |
| **Order -> Product** | `PATCH /api/product-internal/stock/reduce` | Deduct sold items from inventory |
| **Product -> Notif** | `POST /api/notif-internal/stock-alert` | Alert when stock is critically low |
| **Order -> Notif** | `POST /api/notif-notifications/send-email` | Send customer receipt |

---

## 🛡️ Security of Inter-service Calls
Even though these services are "internal," they still use **Gateway Security**. When the Order Service calls the Product Service, it passes the user's `x-user-id` and `x-user-role`. This ensures that a user can only reduce stock if they are actually in the middle of a valid checkout process.
