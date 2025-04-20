<p align="center">
  <a href="https://github.com/yourusername/shopping-cart-app/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/yourusername/shopping-cart-app/ci.yml?style=flat-square" alt="CI Status" />
  </a>
  <a href="https://img.shields.io/badge/Node.js-18.x-blue?style=flat-square">
    <img src="https://img.shields.io/badge/Node.js-18.x-blue?style=flat-square" alt="Node.js Version" />
  </a>
  <a href="https://img.shields.io/badge/MongoDB-6.0-green?style=flat-square">
    <img src="https://img.shields.io/badge/MongoDB-6.0-green?style=flat-square" alt="MongoDB Version" />
  </a>
</p>

# Shopping Cart Service
A lightweight, RESTful shopping cart application built with **Node.js** and **MongoDB**.

---

## 🚀 Quick Start

1. **Clone the repository:**

```
git clone https://github.com/yourusername/shopping-cart-app.git
cd shopping-cart-app
```

2. **Install dependencies:**

```
yarn install
```

3. **Configure the database:**

- Edit `config/default.json` or set the `MONGODB_URI` environment variable.

4. **Start MongoDB:**

```
mongod
```

5. **(Optional) Seed the database:**

```
yarn seed
```

6. **Run the application:**

- **Production Build:**

```
yarn build && yarn start
```

- **Development Mode (hot-reload):**

```
yarn watch-node
```

---

## 📐 Architecture

The application follows a **Model–Controller** pattern with request workflows:

- **Controllers:** Manage HTTP routes and trigger response animations.
- **Models:** Define `Cart` and `Product` MongoDB schemas.
- **Routes:** Link endpoints to controller logic, each showing smooth SVG spinners.

---

## 🔌 API Endpoints

### Health Check

- **GET** `/health`

  Returns HTTP `200 OK` with a pulsing heart icon in the JSON payload.

### Cart Operations

- **GET** `/shopping-cart/:userId`

  Retrieve the specified user’s cart.

- **POST** `/shopping-cart/:userId/add`

  Add items to the user’s cart.

```
{
  "items": [
    { "sku": "0001", "quantity": 1 }
  ]
}
```

- **POST** `/shopping-cart/:userId/remove`

  Remove items from the user’s cart.

```
{
  "items": [
    { "sku": "0001", "quantity": 1 }
  ]
}
```

---

## 🧪 Testing & Coverage

- Core business logic is verified with Jest and dynamic coverage badges.
- Future enhancements will include edge-case and integration tests with reports.

