"use strict";

const { test } = require("tap");
const { build } = require("../helper");

test("Create User - Valid Input", async (t) => {
  const app = await build(t);

  const newUser = {
    firstName: "john",
    lastName: "doe",
    email: "john.doe@example.com",
    password: "securePassword",
  };

  const response = await app.inject({
    method: "POST",
    url: "/api/auth/signup",
    payload: newUser,
  });

  t.equal(
    response.statusCode,
    201,
    "Should return 201 status code for successful user creation",
  );
  t.equal(
    response.payload,
    "Signup success",
    "Should return the correct success message",
  );

  t.end();
});

test("Create User - Missing Email Fields", async (t) => {
  const app = await build(t);

  const invalidUser = {
    firstName: "john fail",
    lastName: "doe john fail",
    password: "securePassword",
  };

  const response = await app.inject({
    method: "POST",
    url: "/api/auth/signup",
    payload: invalidUser,
  });

  t.equal(response.statusCode, 500, "Should return 500 status code for bad request");
  t.equal(
    response.json().message,
    "Column 'email' cannot be null",
    "Should return error message",
  );

  t.end();
});

test("User Signin - Valid Input", async (t) => {
  const app = await build(t);

  const validUser = {
    email: "john.doe@example.com",
    password: "securePassword",
  };

  const response = await app.inject({
    method: "POST",
    url: "/api/auth/signin",
    payload: validUser,
  });

  t.equal(
    response.statusCode,
    200,
    "Should return 200 status code for successful user creation",
  );
  t.equal(
    response.payload,
    "Signin success",
    "Should return the correct success message",
  );

  t.end();
});

test("User Signin - Password Not Match", async (t) => {
  const app = await build(t);

  const invalidUser = {
    email: "john.doe@example.com",
    password: "securePasswordwrong",
  };

  const response = await app.inject({
    method: "POST",
    url: "/api/auth/signin",
    payload: invalidUser,
  });

  t.equal(response.statusCode, 401, "Should return 401 status code for bad request");
  t.equal(
    response.json().message,
    "Authentication failed. Incorrect password.",
    "Should return error message",
  );

  t.end();
});
