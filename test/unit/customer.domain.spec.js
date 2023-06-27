const Customer = require("../../src/models/customerModel");
const Product = require("../../src/models/productModel");
const { customers } = require("../fixtures/customer");
const { product } = require("../fixtures/product");
const {
  fetchCustomer,
  getCustomer,
  createCustomer,
  editCustomer,
  binCustomer,
  searchCustomer,
} = require("../../src/domain/customerdomain");

describe("src/domain/customer.domain.spec.js", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe("fetchCustomer()", () => {
    it("should return all Customers", async () => {
      jest.spyOn(Customer, "find").mockResolvedValue(customers);
      const response = await fetchCustomer();
      expect(response.data).toBe(customers);
    });
  });
  describe("getCustomer()", () => {
    it("should return one Customer", async () => {
      jest.spyOn(Customer, "findOne").mockResolvedValue(customers[0]);
      const response = await getCustomer(customers[0]._id);
      expect(response).toHaveProperty("data");
      expect(response.data).toBe(customers[0]);
    });
    it("should throw an error", async () => {
      jest.spyOn(Customer, "findOne").mockRejectedValue();
      const response = await getCustomer("gdgdfdgf");
      expect(response).not.toHaveProperty("data");
      expect(response).toHaveProperty("message");
      expect(response.message).toBe("Customer tidak ditemukan");
    });
  });
  describe("createCustomer()", () => {
    const newCustomer = {
      name: "Customer18",
    };
    it("should return the inserted Customer", async () => {
      jest.spyOn(Customer, "create").mockResolvedValue(newCustomer);
      jest.spyOn(Customer, "find").mockReturnValue([]);
      const response = await createCustomer(newCustomer);
      expect(response).toHaveProperty("data");
      expect(response.status).toBe(200);
      expect(response.data).toBe(newCustomer);
    });
    it("should throw an error if Customer has already been created", async () => {
      jest.spyOn(Customer, "find").mockReturnValue(newCustomer);
      const response = await createCustomer(newCustomer);
      expect(response).not.toHaveProperty("data");
      expect(response).toHaveProperty("message");
      expect(response.message).toBe("Customer sudah ada");
    });
    it("should throw an error if failed to create Customer", async () => {
      jest.spyOn(Customer, "create").mockRejectedValue();
      jest.spyOn(Customer, "find").mockReturnValue([]);
      const response = await createCustomer(newCustomer);
      expect(response).not.toHaveProperty("data");
      expect(response).toHaveProperty("message");
      expect(response.message).toBe("Gagal menambahkan Customer");
    });
  });
  describe("editCustomer()", () => {
    const updatedCustomer = {
      name: "Customer-1",
    };
    it("should return the updated Customer", async () => {
      jest.spyOn(Customer, "updateOne").mockResolvedValue({ modifiedCount: 1 });
      jest.spyOn(Customer, "find").mockReturnValue([]);
      const response = await editCustomer(customers[0]._id, updatedCustomer);
      expect(response).toHaveProperty("data");
      expect(response.status).toBe(200);
      expect(response.data).toBe(updatedCustomer);
    });
    it("should throw an error if Customer already exists", async () => {
      jest.spyOn(Customer, "find").mockReturnValue(updatedCustomer);
      const response = await editCustomer(customers[0]._id, updatedCustomer);
      expect(response).not.toHaveProperty("data");
      expect(response).toHaveProperty("message");
      expect(response.message).toBe("Customer sudah ada");
    });
    it("should throw an error if failed to update Customer", async () => {
      jest.spyOn(Customer, "updateOne").mockRejectedValue();
      jest.spyOn(Customer, "find").mockReturnValue([]);
      const response = await editCustomer(customers[0]._id, updatedCustomer);
      expect(response).not.toHaveProperty("data");
      expect(response).toHaveProperty("message");
      expect(response.message).toBe("Gagal memperbarui Customer");
    });
  });
  describe("binCustomer()", () => {
    it("should return a message indicating the Customer is deleted", async () => {
      jest.spyOn(Customer, "deleteOne").mockResolvedValue({ deletedCount: 1 });
      jest.spyOn(Product, "find").mockReturnValue([]);
      const response = await binCustomer(customers[3]._id);
      expect(response).toHaveProperty("message");
      expect(response.status).toBe(200);
      expect(response.message).toBe("Berhasil menghapus Customer");
    });
    it("should throw an error if Customer cannot be deleted because there are linked items", async () => {
      jest.spyOn(Product, "find").mockResolvedValue(product[0]);
      const response = await binCustomer(customers[1]._id);
      expect(response).not.toHaveProperty("data");
      expect(response).toHaveProperty("message");
      expect(response.status).toBe(400);
    });
    it("should throw an error if failed to delete Customer", async () => {
      jest.spyOn(Product, "find").mockReturnValue([]);
      jest.spyOn(Customer, "deleteOne").mockRejectedValue();
      const response = await binCustomer(customers[2]._id);
      expect(response).not.toHaveProperty("data");
      expect(response).toHaveProperty("message");
      expect(response.message).toBe("Gagal menghapus Customer");
    });
  });
  describe("searchCustomer()", () => {
    it("should return the searching Customer", async () => {
      jest.spyOn(Customer, "find").mockResolvedValue(customers[0]);
      const response = await searchCustomer({ name: customers[0].name });
      expect(response).toHaveProperty("data");
      expect(response.status).toBe(200);
      expect(response.data).toBe(customers[0]);
    });
    it("should return a not found message", async () => {
      jest.spyOn(Customer, "find").mockResolvedValue([]);
      const response = await searchCustomer({ name: "Customer376" });
      expect(response).toHaveProperty("message");
      expect(response.status).toBe(404);
      expect(response.message).toBe("Data Customer tidak ada!");
    });
  });
});
