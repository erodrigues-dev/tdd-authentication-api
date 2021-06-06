const request = require('supertest')

const app = require('../../src/app')
const { User } = require('../../src/app/models');

const truncate = require('../utils/truncate');

const makeUser = () => User.create({
  name: 'any_name',
  email: 'any_email@email.com',
  password: '1234'
})

describe("Authentication", () => {
  
  beforeEach(async () => await truncate())

  it('should authenticate with valid credentials', async () => {
    const user = await makeUser();

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '1234'
      })

      expect(response.status).toBe(200)
  })

  it('should return 401 with invalid credentials', async () => {
    const user = await makeUser()

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: 'not_valid_password'
      })

      expect(response.status).toBe(401)
  })

  it('should return jwt token when authenticated', async () => {
    const user = await makeUser()

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '1234'
      })

      expect(response.body).toHaveProperty('token')
  })

  it('should access privated route with valid jwt token', async () => {
    const user = await makeUser()
    const token = await user.generateToken();

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200);
  })

  it('should return 401 if without jwt token is provided', async () => {
    const response = await request(app)
      .get('/dashboard')

      expect(response.status).toBe(401);
  })

  it('should return 401 if a invalid token is provided', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer any_invalid_token`)

      expect(response.status).toBe(401);
  })
});
