# Shopping Cart app

[definition](https://potent-afternoon-af0.notion.site/Shopping-cart-ac0c7820e1c34032a46eb98d8105db0)

# Table of contents:

- [Pre-reqs](#pre-reqs)
- [Getting started](#getting-started)
- [API](#api)

# Pre-reqs

To build and run this app locally you will need a few things:

- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)

# Getting started

- Clone the repository
- Install dependencies

```
yarn
```

- Configure your mongoDB server

- Start your mongoDB server

```bash
mongod
```

- Seed data into you db

```
yarn seed
```

- Build and run the project

```
yarn build
yarn start
```

Or

```
yarn watch-node
```

# Architecture

Entry point (server router) >> Controllers >> Models

The app uses a basic Model-Controller architecture.

Test coverage is not good, currently tests cover only the the business logic. With more time I would increase coverage and add more edge cases.

## Models:

- Cart
- Product

# API

## GET /shopping-cart

Healthcheck endpoint. Should always return 200 OK.

## GET /shopping-cart/:userId

Returns a shopping cart based on the provided id.

## POST /shopping-cart/:userId/add

Adds specified items to shopping cart
Body:

```
{
    "items": [
        {
            "sku": "0001",
            "quantity": 1
        }
    ]
}
```

## POST /shopping-cart/:userId/remove

Removes specified items from shopping cart
Body:

```
{
    "items": [
        {
            "sku": "0001",
            "quantity": 1
        }
    ]
}
```
