# Shopping Cart Service

A lightweight RESTful shopping cart application built with Node.js and MongoDB.

## Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. **Clone the repository**
   ```bash
git clone https://github.com/leaopedro/shopping-cart.git
cd shopping-cart
```
2. **Install dependencies**
   ```bash
yarn install
```
3. **Configure database**
   - Update your MongoDB connection settings in `config/default.json` or via environment variables.
4. **Start MongoDB**
   ```bash
mongod
```
5. **(Optional) Seed the database**
   ```bash
yarn seed
```
6. **Run the application**
   - Production build:
     ```bash
yarn build
yarn start
```
   - Development mode (auto-reload):
     ```bash
yarn watch-node
```

## Architecture
Follows a Model‑Controller pattern:

- **Controllers**: Handle incoming HTTP requests and responses.
- **Models**: Define MongoDB schemas and interact with the database.
- **Routes**: Map endpoints to controller actions.

## API Endpoints

### Health Check
- **GET** `/health`  
  Returns HTTP 200 OK.

### Cart Operations

- **GET** `/shopping-cart/:userId`  
  Retrieve the cart for a specific user.

- **POST** `/shopping-cart/:userId/add`  
  Add items to the user’s cart.  
  **Request Body:**
  ```json
  {
    "items": [
      { "sku": "0001", "quantity": 1 }
    ]
  }
  ```

- **POST** `/shopping-cart/:userId/remove`  
  Remove items from the user’s cart.  
  **Request Body:**
  ```json
  {
    "items": [
      { "sku": "0001", "quantity": 1 }
    ]
  }
  ```

## Testing
Test coverage currently focuses on core business logic. Future improvements will extend coverage to edge cases and integration tests.

