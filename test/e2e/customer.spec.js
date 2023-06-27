const supertest = require('supertest');
const { app } = require('../app');
const { disconnectDB } = require('../../src/databases/db');
const { insertCustomer, deleteCustomer } = require('../fixtures/customer');
const { deleteUser } = require('../fixtures/user');

describe('tests/e2e/Customer.spec.js', () => {
  let token = '';
  const data = {
    username: 'test',
    password: 'test',
    password_confirm: 'test',
    name: 'Tester',
  };
  
  beforeAll(async () => {
    await deleteCustomer();
    await insertCustomer();
    await supertest(app).post('/auth/register').send(data);
    const auth = await supertest(app).post('/auth/login').send({
      username: data.username,
      password: data.password
    });
    token = auth.body.data.token;
    console.log(auth.body);
  });

  describe('GET /customers', () => {
    it('should return statusCode 200 when request success', async () => {
      const response = await supertest(app)
        .get('/customers')
        .set('Authorization', token);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('GET /customers/:id', () => {
    it('should return statusCode 200 when request success', async () => {
      const response = await supertest(app)
        .get(`/customers/649a651957d5a9b47b9db0bd`)
        .set('Authorization', token);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      // Menambahkan pengujian lebih lanjut berdasarkan konten/respons yang diharapkan
    });
  });

  describe('POST /customers', () => {
    it('should return statusCode 200 when customer is added successfully', async () => {
      const newCustomer = {
        name: 'New Customer',
        email: 'newcustomer@example.com',
        phone: '1234567890'
      };
      const response = await supertest(app)
        .post('/customers')
        .set('Authorization', token)
        .send(newCustomer);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      // Menambahkan pengujian lebih lanjut berdasarkan konten/respons yang diharapkan
    });
  });

  describe('PATCH /customers/:id', () => {
    it('should return statusCode 200 when customer is updated successfully', async () => {
      const updatedCustomerData = {
        name: 'Updated Customer',
        email: 'updatedcustomer@example.com',
        phone: '9876543210'
      };
      const response = await supertest(app)
        .patch(`/customers/6486ef6fdc1c04f730a2c1d0`)
        .send(updatedCustomerData)
        .set('Authorization', token);        
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      // Menambahkan pengujian lebih lanjut berdasarkan konten/respons yang diharapkan
    });
  });

  describe('DELETE /customers/:id', () => {
    it('should return statusCode 200 when customer is deleted successfully', async () => {
      const response = await supertest(app)
        .delete(`/customers/6486ef6fdc1c04f730a2c1d0`)
        .set('Authorization', token);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      // Menambahkan pengujian lebih lanjut berdasarkan konten/respons yang diharapkan
    });
  });

  afterAll(async () => {
    await deleteCustomer();
    await deleteUser();
    await disconnectDB();
  });
});
