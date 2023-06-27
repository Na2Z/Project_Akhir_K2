const supertest = require("supertest");
const { app } = require("../app");
const { disconnectDB } = require("../../src/databases/db");
const { insertOrder, deleteOrder } = require("../fixtures/order");
const { deleteUser } = require("../fixtures/user");

describe("tests/e2e/product.spec.js", () => {
  let token = "";
  const data = {
    username: "test",
    password: "test",
    password_confirm: "test",
    name: "Tester",
  };
  beforeAll(async () => {
    await deleteOrder();
    await insertOrder();
    await supertest(app).post("/auth/register").send(data);
    const auth = await supertest(app).post("/auth/login").send({
      username: data.username,
      password: data.password,
    });
    token = auth.body.data.token;
    console.log(auth.body);
  });

  describe("GET /orders/:id", () => {
    it("should return statusCode 200 when request success", async () => {
      const response = await supertest(app)
        .get("/orders/649a9db1286116441a4cf582")
        .set("Authorization", token);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      // Tambahkan pengujian lebih lanjut berdasarkan konten/respons yang diharapkan
    });
  });

  describe("POST /orders", () => {
    it("should return statusCode 201 when customer is added successfully", async () => {
      const newOrderData = {
        customer: "649a9add811d67cd3dafbd34",
        products: "649a9af3811d67cd3dafbd36",
        totalPrice: 10000,
        status: "pending",
      };
      const response = await supertest(app)
        .post("/orders")
        .set("Authorization", token)
        .send(newOrderData);
      expect(response.statusCode).toBe(201);
      expect(response.body).toBeDefined();
      // Tambahkan pengujian lebih lanjut berdasarkan konten/respons yang diharapkan
    });
  });

  describe("PUT /orders/:id", () => {
    it("should return statusCode 200 when customer is updated successfully", async () => {
      const updatedOrderData = {
        customer: "649a9add811d67cd3dafbd34",
        products: "649a9af3811d67cd3dafbd36",
        totalPrice: 10000,
        status: "sending",
      };
      const response = await supertest(app)
        .put("/orders/649a9db1286116441a4cf582")
        .send(updatedOrderData)
        .set("Authorization", token);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      // Tambahkan pengujian lebih lanjut berdasarkan konten/respons yang diharapkan
    });
  });

  describe("DELETE /orders/:id", () => {
    it("should return statusCode 200 when customer is deleted successfully", async () => {
      const response = await supertest(app)
        .delete("/orders/649a9db1286116441a4cf582")
        .set("Authorization", token);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      // Tambahkan pengujian lebih lanjut berdasarkan konten/respons yang diharapkan
    });
  });

  afterAll(async () => {
    await deleteOrder();
    await deleteUser();
    await disconnectDB();
  });
});
