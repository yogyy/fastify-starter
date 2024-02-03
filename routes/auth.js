"use strict";

const argon = require("argon2");
const { generateTokens, findUser } = require("../lib/utils");

module.exports = async function (fastify, opts) {
  fastify.post("/auth/signup", async (req, reply) => {
    const { email, password, firstName, lastName } = req.body;
    const hashed = await argon.hash(password);
    fastify.mysql.query(
      `INSERT INTO users (email, hash, firstName, lastName) VALUES (?, ?, ?, ?)`,
      [email, hashed, firstName, lastName],
      async (err, result) => {
        if (err) {
          // Check for duplicate entry error
          if (err.code === "ER_DUP_ENTRY") {
            return reply.status(409).send({
              error: "Duplicate entry",
              message: "Email address already exists",
            });
          } else {
            return reply
              .status(500)
              .send({ error: "Internal Server Error", message: err.message });
          }
        } else {
          const user = await findUser(fastify.mysql, email);
          const { accessToken } = await generateTokens(fastify.jwt, user);
          delete user.hash;
          reply
            .setCookie("token", accessToken, {
              domain: "127.0.0.1",
              path: "/",
              secure: true,
              httpOnly: true,
              sameSite: "none",
            })
            .status(201)
            .send(user);
        }
      },
    );

    return reply;
  });

  fastify.post("/auth/signin", async (req, reply) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return reply.code(401).send({
        message: "Invalid email or password",
      });
    }
    const user = await findUser(fastify.mysql, email);
    const { accessToken } = await generateTokens(fastify.jwt, user);
    const matchPassword = await argon.verify(user.hash, password);
    console.log("password match ??", matchPassword);

    if (!matchPassword) {
      return reply.code(401).send({
        message: "Authentication failed. Incorrect password.",
      });
    }
    return reply
      .setCookie("token", accessToken, {
        domain: "127.0.0.1",
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "none",
      })
      .code(200)
      .send("Signin success");
  });
};
