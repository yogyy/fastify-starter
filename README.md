# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)

This project was bootstrapped with Fastify-CLI.

## Available Scripts

```js
const connection = await fastify.mysql.getConnection(); // <== using this when promise is true in '/plugins/mysql.js'
const [rows, fields] = await connection.query(
  `SELECT * FROM users where id=${req.params.id}`,
);

if (!rows[0]) {
  return { error: "User not found" };
}

connection.release();
return rows[0];
```

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).
