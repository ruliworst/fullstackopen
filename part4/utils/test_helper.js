const initialBlogs = [
  {
    'title': 'Doing an HTTP GET Request from REST Client',
    'author': 'Ruliworst',
    'url': 'http://www.ruliworst.com/',
    'likes': 10,
    'user': '62e2a7cc87a6a808e9798993'
  },
  {
    'title': 'Food blog',
    'author': 'Rulichef',
    'url': 'http://www.chef.com/',
    'likes': 12,
    'user': '62e2a7cc87a6a808e9798993'
  },
  {
    'title': 'Videogames Blog: MOBA',
    'author': 'Ruligamer',
    'url': 'http://www.gamer.com/',
    'likes': 1032,
    'user': '62e2a7cc87a6a808e9798993'
  },
  {
    'title': 'Sports Club',
    'author': 'Lewandowski',
    'url': 'http://www.fcb.com/',
    'likes': 1232,
    'user': '62e2a3848dad8fcb2b27feca'
  }
]

const initialUsers = [
  {
    _id: '62e2a7cc87a6a808e9798993',
    username: 'ruliworst',
    name: 'Ruli Worst',
    passwordHash: '$2a$10$5UqyS.BuadY.n.sHR6KEHOZ507M9nWLJEBNhNYpvNkACyEVP4vWyO',
    __v: 0
  },
  {
    _id: '62e2a3848dad8fcb2b27feca',
    username: 'Ruli Worst',
    name: 'ruliworst',
    passwordHash: '$2a$10$RPpqwYCWGKqasMQ.nlvNaO1QaI1OyvohZGLZElXnHKNZhRQTlhkaC',
    __v: 0
  }
]

module.exports = {
  initialBlogs,
  initialUsers
}