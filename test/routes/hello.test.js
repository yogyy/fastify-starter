"use strict";

const { test } = require("tap");
const { build } = require("../helper");

test("POST /", async (t) => {
  const app = await build(t);

  const payload = { name: "John", age: 30 };
  const response = await app.inject({
    method: "POST",
    url: "/api/hello",
    payload: payload,
  });

  const expectedResponse = { message: "test John, umur 30" };

  t.equal(response.statusCode, 200, "Should return 200 status code");
  t.same(
    JSON.parse(response.payload),
    expectedResponse,
    "Response should match the expected object",
  );

  t.end();
});

test("GET /:id", async (t) => {
  const app = await build(t);

  const response = await app.inject({
    method: "GET",
    url: "/api/hello/123",
  });

  const expectedResponse = { message: "test 123" };

  t.equal(response.statusCode, 200, "Should return 200 status code");
  t.same(
    JSON.parse(response.payload),
    expectedResponse,
    "Response should match the expected object",
  );

  t.end();
});

test("GET / without id", async (t) => {
  const app = await build(t);

  const response = await app.inject({
    method: "GET",
    url: "/api/hello",
  });

  const expectedResponse = { message: "test undefined" };

  t.equal(response.statusCode, 200, "Should return 200 status code");
  t.same(
    JSON.parse(response.payload),
    expectedResponse,
    "Response should match the expected object",
  );

  t.end();
});
