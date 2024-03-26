# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)

This project was bootstrapped with Fastify-CLI.

## Create Table

```bash
CREATE TABLE fastify_users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    email VARCHAR(191) NOT NULL UNIQUE,
    hash VARCHAR(191) NOT NULL,
    firstName VARCHAR(191),
    lastName VARCHAR(191)
);
```

#### POST /api/auth/signup

```json
{
  "email": "test@mail.to",
  "password": "123",
  "firstName": "tester",
  "lastName": "?" // optional
}
```

#### POST /api/auth/signin

```json
{ "email": "test@mail.to", "password": "123" }
```

#### GET /api/users/details , /api/users/:id

```js
/**
 * Require Authorization in headers.
 *
 * Usage:
 * - Include 'Authorization' in headers.
 * - Use 'Bearer [token]' as the value for the Authorization header.
 * - Obtain the token after signup or signin.
 *
 * GET /api/users/details
 * - Retrieve details of the authenticated user.
 * - Authorization token must be included in headers.
 *
 * GET /api/users/:id
 * - Retrieve details of a specific user by ID.
 * - Requires user ID as a parameter in the URL.
 * - Authorization token must be included in headers.
 */
```

### Route

#### basic route

```js
/**
 * GET /api
 * GET /api/ping
 * GET /api/hello
 * - { name, age } in body
 * GET /api/hello/:id
 * - { id } in params
 * /
```

## Available Scripts

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Read [testing docs](https://node-tap.org/basics/)

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).
