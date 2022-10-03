const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const testHelper = require('../utils/test_helper')
const supertest = require('supertest')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(testHelper.initialUsers)
})

test('user with username or password with less than 3 characters long, returns an error', async () => {
  const user = {
    username: 'l',
    password: 'a'
  }

  const response = await api.post('/api/users/register').send(user)

  expect(response.statusCode).toBe(400)
  expect(response.body.error).toBe('Both username and password must be at least 3 characters long.')
})

test('already registered nickname, returns an error', async () => {
  const user = {
    username: 'ruliworst',
    password: 'a12312'
  }

  const response = await api.post('/api/users/register').send(user)

  expect(response.statusCode).toBe(400)
})

afterAll(() => {
  mongoose.connection.close()
})