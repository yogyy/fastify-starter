"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, options) {
  const schema = {
    type: "object",
    required: [
      "DB_URL",
      "DB_HOST",
      "DB_USER",
      "DB_PASS",
      "DB_PORT",
      "DB_NAME",
      "JWT_SECRET",
      "COOKIE_SECRET",
    ],
    properties: {
      DB_URL: {
        type: "string",
        default: "0.0.0.0",
      },
      DB_HOST: {
        type: "string",
        default: "",
      },
      DB_USER: {
        type: "string",
        default: "",
      },
      DB_PASS: {
        type: "string",
        default: "",
      },
      DB_PORT: {
        type: "string",
        default: "",
      },
      DB_NAME: {
        type: "string",
        default: "",
      },
      JWT_SECRET: {
        type: "string",
        default: "",
      },
      COOKIE_SECRET: {
        type: "string",
        default: "",
      },
    },
  };

  const envOptions = {
    confKey: "config", // optional, default: 'config'
    schema: schema,
    data: process.env, // optional, default: process.env
  };

  fastify.register(require("@fastify/env"), envOptions).ready((err) => {
    if (err) console.error(err);
  });
});
