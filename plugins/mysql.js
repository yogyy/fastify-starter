'use strict';

const fp = require('fastify-plugin');

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/mysql'), {
    connectionString:
      'mysql://root:root@localhost:3306/nyoba_nest?schema=public',

    // promise: true,
  });
  fastify.log.info('Connected to local mysql');
});
