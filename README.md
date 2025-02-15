# Inventory Management System

## Overview
This project is a **CRUD-based Inventory Management System** with user authentication. It allows users to manage inventory items, authenticate using JWT, and perform basic operations like adding, updating, deleting, and viewing inventory items.

## Features
- **User Authentication:** Secure login and registration using JWT.
- **CRUD Operations:** Create, Read, Update, and Delete inventory items.
- **Search & Pagination:** Efficiently browse and manage inventory.
- **Rate Limiting:** Prevents excessive requests to enhance security.
- **Dockerization:** Containerized deployment for easy scalability.
- **CORS Handling:** Configured for seamless frontend-backend communication.

## Project Structure
```
/root-folder
│── backend
│   ├── controllers      # Business logic for routes
│   ├── models           # Mongoose models
│   ├── routes           # API endpoints
│   ├── middleware       # Authentication & security
│   ├── config           # Database & environment config
│   ├── server.js        # Entry point
│
│── frontend
│   ├── src
│   │   ├── components   # Reusable UI components
│   │   ├── pages        # Individual pages
│   │   ├── services     # API calls
│   │   ├── App.js       # Main component
│   │   ├── index.js     # React entry point
│   ├── public          # Static assets
│
│── .env                 # Environment variables
│── package.json         # Dependencies
│── README.md            # Project documentation
```

## API Endpoints
### Authentication
- **POST** `/api/auth/register` → Register new users
- **POST** `/api/auth/login` → Login and receive JWT token

### Inventory Management
- **GET** `/api/inventory` → Fetch all items (with search & pagination)
- **POST** `/api/inventory` → Add new item (authenticated users only)
- **PUT** `/api/inventory/:id` → Update an item
- **DELETE** `/api/inventory/:id` → Remove an item

## Technologies Used
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** React.js, Vite
- **Authentication:** JWT


