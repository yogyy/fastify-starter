"use strict";

/** @param {import('fastify').FastifyInstance} fastify */
module.exports = async function (fastify, opts) {
  fastify.get("/", function (_, reply) {
    return reply.status(200).type("text/html").send(html);
  });

  fastify.get("/ping", async (_, reply) => {
    return reply.status(200).send("pong");
  });
};

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
