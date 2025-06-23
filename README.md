# Secure Task Manager

A secure, role-based task manager built with **NestJS**, **Angular**, and **Tailwind CSS**, structured using **Nx Monorepo**.

## 🔗 Links

- 🔐 GitHub: https://github.com/Ramesh-krishnan-v/secure-task-manager
- 📬 Postman Collection: https://secure-task-manager.postman.co/workspace/My-Workspace~c106775c-e76c-4201-841b-877faee8ff01/collection/10211182-20a1b667-da4d-4b42-bcf0-cdfa85a168ce

## 🧩 Features

- Role-based task access (Admin, Owner, Viewer)
- JWT or Header-based authentication
- Task CRUD operations
- Responsive dashboard with charts
- Angular + Tailwind UI, NestJS backend
- UI testing with **Jest**

## 🧪 Login Credentials

Upon starting the server, a default **Super Admin** user is seeded:

- **Email:** admin@gmail.com
- **Password:** admin

Use these credentials to log in and begin managing tasks.

## ⚙️ Getting Started

### 1. Clone the repo
git clone https://github.com/Ramesh-krishnan-v/secure-task-manager.git

### 2. Install dependencies
npm install

### 3. Run backend (NestJS API)
npx nx serve api

### 4. Run frontend (Angular Dashboard)
npx nx serve dashboard

## 📊 Testing APIs

Use the Postman Collection link above to test task APIs.

## 🧠 Nx Commands

- Build: npx nx build [project]
- Serve: npx nx serve [project]
- Graph: npx nx graph

---

Developed by **Ramesh Krishnan V**