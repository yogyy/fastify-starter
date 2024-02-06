"use strict";

const { test } = require("tap");
const { build } = require("../helper");

test("GET / redirects to /api", async (t) => {
  const app = await build(t);

  const response = await app.inject({
    method: "GET",
    url: "/",
    followRedirect: false, // Prevent auto-following redirects
  });

  t.equal(response.statusCode, 302, "Should return 302 status code for redirection");
  t.equal(response.headers.location, "/api", "Should redirect to /api");

  t.end();
});
test("default root route", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/api",
  });
  t.equal(res.payload, html);
});

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
    />
    <title>Vercel + Fastify Hello World</title>
    <meta
      name="description"
      content="This is a starter template for Vercel + Fastify."
    />
  </head>
  <body>
    <h1>Vercel + Fastify Hello World</h1>
    <p>
      This is a starter template for Vercel + Fastify. Requests are
      rewritten from <code>/*</code> to <code>/api/*</code>, which runs
      as a Vercel Function.
    </p>
    <p>
        For example, here is the boilerplate code for this route:
    </p>
    <pre>
<code>"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", function (req, reply) {
    return reply.status(200).type("text/html").send(html);
  });

  fastify.get("/ping", async (req, reply) => {
    return reply.status(200).send("pong");
  });
};</code>
  </body>
</html>
`;
// inject callback style:
//
// test('default root route', (t) => {
//   t.plan(2)
//   const app = await build(t)
//
//   app.inject({
//     url: '/'
//   }, (err, res) => {
//     t.error(err)
//     t.same(JSON.parse(res.payload), { root: true })
//   })
// })
