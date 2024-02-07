import fastifyCookie from "@fastify/cookie";
import fastifyFormbody from "@fastify/formbody";
import { jwt } from "./src/plugins/jwt.js";
import { cors } from "./src/plugins/cors.js";
import { env } from "./src/plugins/env.js";
import { mysql } from "./src/plugins/mysql.js";
import { sensible } from "./src/plugins/sensible.js";
import { support } from "./src/plugins/support.js";

/** @param {import('fastify').FastifyInstance} fastify */
export default async function (fastify, opts) {
  fastify.get("/", function (_, reply) {
    return reply.redirect("/api");
  });

  fastify.register(fastifyFormbody);

  fastify.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
    hook: "onRequest",
    parseOptions: {},
    forceESM: true,
  });
  fastify.register(jwt);
  fastify.register(cors);
  fastify.register(env);
  fastify.register(mysql);
  fastify.register(sensible);
  fastify.register(support);

  fastify.register(import("./src/routes/root.js"), { prefix: "/api" });
  fastify.register(import("./src/routes/example/index.js"), { prefix: "/api/example" });
  fastify.register(import("./src/routes/hello/index.js"), { prefix: "/api/hello" });
  fastify.register(import("./src/routes/users/index.js"), { prefix: "/api/users" });
  fastify.register(import("./src/routes/auth.js"), { prefix: "/api/auth" });
}
