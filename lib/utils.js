const generateTokens = async (jwt, user) => {
  const accessToken = jwt.sign({
    sub: user.id,
    email: user.email,
    name: user.firstName + " " + user.lastName ?? "",
    role: "user",
  });

  // const refreshToken = fastify.jwt.sign({ sub: user.id }, { expiresIn: "7d" });

  return { accessToken };
};

const findUser = async (mysql, email) => {
  return new Promise((resolve, reject) => {
    mysql.query("SELECT * FROM users WHERE email = ?", [email], (err, res) => {
      if (err) {
        reject(reply.send(err));
      } else if (!res[0]) {
        reject(reply.code(404).send({ message: "User not found" }));
      } else {
        delete res[0].hash;
        resolve(res[0]);
      }
    });
  });
};

module.exports = { generateTokens, findUser };
