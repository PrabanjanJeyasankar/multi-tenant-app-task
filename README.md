# Multi-Tenant React Application

## Objective

This application supports two tenants with unique configurations, including:

- Different logos and color themes (each tenant has a unique primary and secondary color).
- Different layouts:
  - Tenant 1: Side navigation layout.
  - Tenant 2: Top navigation layout.
- Tenant configurations are stored in a JSON file.
- The application dynamically loads tenant-specific configurations based on the subdomain.
  - Example:
    - `subdomain1.domain.com` → Tenant 1
    - `subdomain2.domain.com` → Tenant 2
- A single codebase serves multiple tenants.

---

## Features

### Multi-Tenancy
- Configurations are loaded dynamically based on the subdomain.
- Each tenant has a unique UI and theme.

### Authentication & Authorization
- Two user roles per tenant:
  - **Admin**
  - **User**
- Authentication is managed using **Redux** for state management.
- Local storage is used for session management.
- A logout button clears the session and redirects users to the login page.

### Role-Based Access Control (RBAC)
- **Dashboard Page**
  - Displays two cards.
  - Admins see both cards.
  - Regular users see only one card.
- **Admin Page**
  - Accessible only to Admin users.

### Unit Testing & Code Quality
- Unit tests are written for all components.
- Code coverage is maintained at **80% or higher**.

### Deployment
- The application is deployed on **Firebase**.
- Two instances are hosted using the same source code to enable a multi-tenant setup.
