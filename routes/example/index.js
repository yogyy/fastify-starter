'use strict';

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    reply.send({ code: 'this is an example' });
  });
};
