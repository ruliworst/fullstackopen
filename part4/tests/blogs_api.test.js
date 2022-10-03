const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const testHelper = require('../utils/test_helper')
const supertest = require('supertest')

const api = supertest(app)

let headers

beforeEach(async () => {
  const newUser = {
    username: 'ruliworst',
    name: 'ruliworst',
    password: 'ruli1234',
  }

  await api
    .post('/api/users/register')
    .send(newUser)

  const result = await api
    .post('/api/users/login')
    .send(newUser)

  headers = {
    'Authorization': `bearer ${result.body.token}`
  }
  
  await Blog.deleteMany({})
  await Blog.insertMany(testHelper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 4 blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(4)
})

test('the first blog is about doing an HTTP GET Request', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  expect(blog.title).toBe('Doing an HTTP GET Request from REST Client')
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach(blog => expect(blog.id).toBeDefined())
})

describe('POST request', () => {
  test('creates new blog', async () => {
    const blog = {
      'title': 'Doing an HTTP POST Request from test',
      'author': 'Ruliworst in tests',
      'url': 'http://www.rulitests.com/',
      'likes': 2,
      'user': testHelper.initialUsers[0].id
    }
  
    await api.post('/api/blogs').send(blog).set(headers)
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(testHelper.initialBlogs.length + 1)
  })

  test('without token, returns 401 status', async () => {
    const newUser = {
      username: 'ruliwot',
      name: 'ruliwot',
      password: '1234',
    }

    await api
      .post('/api/users/login')
      .send(newUser)

    const blog = {
      'title': 'Doing an HTTP POST Request from test',
      'author': 'Ruliworst in tests',
      'url': 'http://www.rulitests.com/',
      'likes': 2,
      'user': testHelper.initialUsers[0].id
    }
  
    const response = await api.post('/api/blogs').send(blog)
    expect(response.status).toBe(401)
  })
})

test('missing likes takes 0 value', async () => {
  const blog = {
    'title': 'Doing an HTTP POST Request from test without likes',
    'author': 'Ruliworst in tests',
    'url': 'http://www.rulitests.com/'
  }

  await api.post('/api/blogs').send(blog).set(headers)
  const response = await api.get('/api/blogs')

  expect(response.body[testHelper.initialBlogs.length].likes).toBe(0)
})

test('missing properties blog returns a 400 Bad Request', async () => {
  const blog = {
    'author': 'Ruliworst in tests'
  }

  const response = await api.post('/api/blogs').send(blog).set(headers)
  
  expect(response.statusCode).toBe(400)
})

describe('DELETE request', () => {
  test('removes a blog from the server', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
  
    await api.delete(`/api/blogs/${blog.id}`).set(headers).expect(204)
  })
  
  test('is denied if a user tries to delete a blog that is not the creator', async () => {
    const blogToRemove = await Blog.findOne({ title: 'Sports Club' })
  
    const response = await api.delete(`/api/blogs/${blogToRemove.id}`).set(headers).expect(401)
    expect(response.body.error).toBe('it is not possible to delete a blog that you are not the creator')
  })
})

test('UPDATE request updates a blog from the server', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  blog.likes = 1000

  await api.put(`/api/blogs/${blog.id}`).send(blog)

  const updatedBlog = await Blog.findById(blog.id)
  expect(updatedBlog.likes).toBe(1000)
})

afterAll(() => {
  mongoose.connection.close()
})