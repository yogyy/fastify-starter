'use strict';

module.exports = async function (fastify, opts) {
  fastify.get('/', function (request, reply) {
    return { code: 'hello world' };
  });

  fastify.get('/ping', async (request, reply) => {
    return reply.notFound();
  });
  fastify.get('/users/:id', async (req, reply) => {
    // const connection = await fastify.mysql.getConnection();
    // const [rows, fields] = await connection.query(
    //   `SELECT * FROM users where id=${req.params.id}`
    // );
    // // `SELECT id, email, firstName, lastName FROM users where id=${req.params.id}`;
    // if (!rows[0]) {
    //   return { error: 'users not found' };
    // }
    // // console.log(rows[0].hash);
    // connection.release();
    // return rows[0];
    fastify.mysql.query(
      `SELECT id, email, firstName, lastName FROM users where id=${req.params.id}`,
      function onResult(err, result) {
        if (err) throw err;
        reply.send(result);
      }
    );
    return reply;
  });
};
