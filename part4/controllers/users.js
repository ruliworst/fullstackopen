const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/register', async (request, response) => {
  const { username, name, password } = request.body

  if(username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: 'Both username and password must be at least 3 characters long.'
    })
  }

  const users = await User.find({})
  const usernames = users.map(u => u.username)
  if(usernames.includes(username)) {
    const errorMessage = `${username} already exists. You should change it.`

    return response.status(400).json({
      error: errorMessage
    })
  }

  const saltRounds = 10
  const passwordHash = await bcryptjs.hash(password, saltRounds)

  const user = new User({
    name,
    username,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.post('/login', async (request, response) => {
  const { username, password } = request.body

  if(username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: 'Both username and password must be at least 3 characters long.'
    })
  }

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    :  await bcryptjs.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = usersRouter