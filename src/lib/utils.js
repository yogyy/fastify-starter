/**
 * @typedef { import('@fastify/jwt').JWT } JWT
 * @param { JWT } jwt
 * @param { string } email
 */

export const generateTokens = async (jwt, user) => {
  const accessToken = jwt.sign({
    sub: user.id,
    email: user.email,
    name: `${user.firstName} ${user.lastName || ""}`.trim(),
    role: "user",
  });

  return { accessToken };
};

/**
 * @typedef { Object } User
 * @property { number } id - The user's ID.
 * @property { string } createAt - The user's name.
 * @property { string } updateAt - The user's name.
 * @property { string } email - The user's name.
 * @property { string } firstName - The user's email.
 * @property { string | null } lastName - The user's email.
 */

/**
 * @typedef { import('mysql').Pool } MYSQL
 * @param { MYSQL } mysql
 * @param { string } email
 * @returns { Promise<User> }
 */

export const findUser = async (mysql, email) => {
  return new Promise((resolve, reject) => {
    mysql.query("SELECT * FROM fastify_users WHERE email = ?", [email], (err, res) => {
      if (err) {
        reject(reply.send(err));
      } else if (!res[0]) {
        reject(reply.code(404).send({ message: "User not found" }));
      } else {
        resolve(res[0]);
      }
    });
  });
};
