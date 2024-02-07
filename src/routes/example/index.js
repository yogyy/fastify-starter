export default async function ExampleRoute(fastify, opts) {
  fastify.get("/", { prefixTrailingSlash: "/api/example" }, async function (req, reply) {
    reply.send({ code: "this is an example" });
  });

  fastify.get("/cookies", async (req, reply) => {
    const token = await reply.jwtSign({
      name: "foo",
      role: ["admin", "spy"],
    });

    reply
      .setCookie("token", token, {
        path: "/",
        secure: true, // send cookie over HTTPS only
        httpOnly: true,
        sameSite: true, // alternative CSRF protection
      })
      .code(200)
      .send("Cookie sent");
  });
}
