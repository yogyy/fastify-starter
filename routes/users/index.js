"use strict";

const argon = require("argon2");

module.exports = async function (fastify, opts) {
  fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get("/", { onRequest: [fastify.authenticate] }, async (req, reply) => {
    if (req.query.id) {
      fastify.mysql.query(
        `SELECT * FROM users where id = ?`,
        [req.query.id],
        function (err, res) {
          if (err) {
            reply.send(err);
          } else if (!res[0]) {
            reply.code(404).send({ error: "User not found" });
          } else {
            delete res[0].hash;
            reply.send(res[0]);
          }
        },
      );
    } else {
      return reply.notFound();
    }

    return reply;
  });

  fastify.get("/details", { onRequest: [fastify.authenticate] }, async (req, reply) => {
    fastify.mysql.query(
      `SELECT * from users WHERE id =${req.user.sub}`,
      async function (err, res) {
        if (err) {
          reply.send(err);
        }
        delete res[0].hash;
        reply.send(res[0]);
      },
    );

    return reply;
  });

  fastify.delete("/", { onRequest: [fastify.authenticate] }, async (req, reply) => {
    // const { email } = req.body;
    fastify.mysql.query(
      `DELETE FROM users WHERE email = '${req.user.email}'`,
      function (err, res) {
        if (err) {
          return reply.send(err);
        }
        if (res.affectedRows === 0) {
          return reply.code(404).send({ error: "User not found" });
        }

        reply.send(res);
      },
    );

    return reply;
  });

  fastify.patch("/", { onRequest: [fastify.authenticate] }, async (req, reply) => {
    const { ...updateFields } = req.body;

    if (updateFields.hasOwnProperty("hash")) {
      updateFields.hash = await argon.hash(updateFields.hash);
    }

    if (Object.keys(updateFields).length === 0) {
      return reply.status(400).send("No fields provided for update");
    }

    const updateValues = Object.entries(updateFields)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(", ");

    console.log(updateValues);

    fastify.mysql.query(
      `UPDATE users SET ${updateValues} WHERE id = ?`,
      [req.user.sub],
      function (err, res) {
        if (err) {
          return reply.status(500).send(err.message);
        }

        reply.send("User info Updated");
      },
    );

    return reply;
  });
};
