"use strict";

import fp from "fastify-plugin";

export const jwt = fp(async function (fastify, opts) {
  fastify.register(import("@fastify/jwt"), {
    secret: process.env.JWT_SECRET,
    sign: {
      expiresIn: "10m",
    },
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});
