const supertest = require("supertest");
const { app } = require("../app");
const { disconnectDB } = require("../../src/databases/db");
const { insertProduct, deleteProduct } = require("../fixtures/product");
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
    await deleteProduct();
    await insertProduct();
    await supertest(app).post("/auth/register").send(data);
    const auth = await supertest(app).post("/auth/login").send({
      username: data.username,
      password: data.password,
    });
    token = auth.body.data.token;
    console.log(auth);
  });

  describe("GET /product", () => {
    it("should return statusCode 200 when request success", async () => {
      const response = await supertest(app)
        .get("/product")
        .set("Authorization", token);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("GET /product/:id", () => {
    it("should return statusCode 200 when request success", async () => {
      const response = await supertest(app)
        .get(`/product/6486ef6fdc1c04f730a2c1d0`)
        .set("Authorization", token);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      // Menambahkan pengujian lebih lanjut berdasarkan konten/respons yang diharapkan
    });
  });

  describe("POST /product", () => {
    it("should return statusCode 201 when Product is added successfully", async () => {
      const newProductData = {
        name: "New product",
        price: 1000,
        description: "new product",
      };
      const response = await supertest(app)
        .post("/product")
        .set("Authorization", token)
        .send(newProductData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      // Menambahkan pengujian lebih lanjut berdasarkan konten/respons yang diharapkan
    });
  });

  describe("PATCH /product/:id", () => {
    it("should return statusCode 200 when Product is updated successfully", async () => {
      const updatedProductData = {
        name: "Updated product",
        email: 2000,
        phone: "update product",
      };
      const response = await supertest(app)
        .patch(`/product/6486ef6fdc1c04f730a2c1d0`)
        .send(updatedProductData)
        .set("Authorization", token);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      // Menambahkan pengujian lebih lanjut berdasarkan konten/respons yang diharapkan
    });
  });

  describe("DELETE /product/:id", () => {
    it("should return statusCode 200 when Product is deleted successfully", async () => {
      const response = await supertest(app)
        .delete(`/product/6486ef6fdc1c04f730a2c1d0`)
        .set("Authorization", token);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      // Menambahkan pengujian lebih lanjut berdasarkan konten/respons yang diharapkan
    });
  });

  afterAll(async () => {
    await deleteProduct();
    await deleteUser();
    await disconnectDB();
  });
});
