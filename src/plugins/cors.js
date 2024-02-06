"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("@fastify/cors"), (instance) => {
    return (req, callback) => {
      const corsOptions = {
        // This is NOT recommended for production as it enables reflection exploits
        origin: true,
        credentials: true,
      };

      // do not include CORS headers for requests from localhost
      if (/^localhost$/m.test(req.headers.origin)) {
        corsOptions.origin = false;
      }

      // callback expects two parameters: error and options
      callback(null, corsOptions);
    };
  });
});
