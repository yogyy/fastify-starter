"use strict";

import fp from "fastify-plugin";

export const mysql = fp(async function (fastify, opts) {
  fastify.register(import("@fastify/mysql"), {
    // connectionString: fastify.config.DB_URL,
    // promise: true,
    host: fastify.config.DB_HOST,
    user: fastify.config.DB_USER,
    password: fastify.config.DB_PASS,
    port: fastify.config.DB_PORT,
    database: fastify.config.DB_NAME,
  });
  // fastify.log.info(fastify.config.DB_URL);
});
