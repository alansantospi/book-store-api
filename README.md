# 📚 Book Store API

## Overview

This project is an API for an online book store, allowing users to create accounts, view books, make orders, and check order history. The API is built using Node.js with Express and MongoDB for data storage.

## Features

- 🌐 User account creation
- 📖 Book listing
- 🛒 Order placement
- 📜 Order history retrieval

## Getting Started

### Prerequisites

- 🚀 Node.js installed
-  📦 MongoDB

🚨 **Note**: A public Cloud Atlas MongoBD instance is available by default, so you don't have to install MongoDB locally or configure a remote MongoDB connection

### Installation

1. 🌀 Clone the repository:

   ```bash
   git clone https://github.com/alansantospi/book-store-api.git

2. 📥 Install dependencies:

   ```bash
   cd online-book-store-api
   npm install
   ```

### Usage
1. ▶️ Run the development server:

   ```bash
   npm run dev
   ```

   💡 The server will be running at http://localhost:3000 by default.

2. 🧪 Test the API using a tool like Postman or curl.

   💡 There is a Postman collection included in the project (book-store-api.postman_collection.json) that contains pre-configured requests to test the API endpoints.

   

### API Main Endpoints

- POST /api/users - Create a new user account.

- GET /api/books - Get a list of available books.

- POST /api/orders - Place a new order.

- GET /api/orders/search?user=:userId - Get order history for a specific user.

### Testing

1. Run tests using:

   ```bash
   npm run test
   ```

🚨 **Note**: The tests use an in-memory database for testing to ensure a clean and isolated environment during testing.

### Contributors
alansantospi

### License
This project is licensed under the MIT License - see the LICENSE file for details.