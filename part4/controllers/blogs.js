const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')

  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  try {
    const user = request.user
    if(!request.token) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const body = request.body
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    })

    let savedBlog = await blog.save()

    savedBlog = await savedBlog.populate('user')
    return response.status(201).json(savedBlog)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try{
    const user = request.user
    if(!user.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blogToRemove = await Blog.findById(request.params.id)
    const creatorId = blogToRemove.user.toString()

    if(creatorId !== user.id) {
      return response.status(401).json({ error: 'it is not possible to delete a blog that you are not the creator' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try{
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog,
      { new: true, runValidators: true, context: 'query' }) 
    return response.json(updatedBlog)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

module.exports = blogsRouter