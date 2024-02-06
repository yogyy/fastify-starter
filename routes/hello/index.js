/** @param {import('fastify').FastifyInstance} fastify */
module.exports = async function (fastify, opts) {
  fastify.post("/", async function (req, res) {
    const { name, age } = req.body;
    res.send({ message: `test ${name}, umur ${age}` });
  });
  fastify.get("/:id?", (request, reply) => {
    const { id } = request.params;
    reply.send({ message: `test ${id}` });
  });

  // fastify.get('/:name', async function (req, res) {
  //   console.log(opts);
  //   res.send({ nama: `halo ${req.params.name}` });
  // });
};
