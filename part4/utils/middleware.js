const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = (request, response, next) => {
  const token = request['token']

  if(token) {
    const user = jwt.verify(token, process.env.SECRET)
    if(user) {
      request.user = user
    }
  }
  next()
}

module.exports = { tokenExtractor, userExtractor }