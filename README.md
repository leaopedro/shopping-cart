# Shopping Cart Service

A lightweight RESTful shopping cart application built with Node.js and MongoDB.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd shopping-cart-app
    ```

2. **Install dependencies:**

    ```bash
    yarn install
    ```

3. **Configure the database:**

    - Update the MongoDB connection settings in `config/default.json` or via environment variables.

4. **Start MongoDB:**

    ```bash
    mongod
    ```

5. **(Optional) Seed the database:**

    ```bash
    yarn seed
    ```

6. **Run the application:**

    - **Production Build**

        ```bash
        yarn build
        yarn start
        ```

    - **Development Mode (auto-reload)**

        ```bash
        yarn watch-node
        ```

## Architecture

The application follows a Model–Controller pattern:

- **Controllers**: Handle incoming HTTP requests and prepare responses.
- **Models**: Define MongoDB schemas and interact with the database.
- **Routes**: Map HTTP endpoints to controller actions.

## API Endpoints

### Health Check

- **GET** `/shopping-cart`

  Returns `200 OK`.

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

Current test coverage focuses on business logic. Future work will expand coverage to include edge cases and integration tests.

