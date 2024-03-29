/* eslint-disable linebreak-style */
Cypress.Commands.add('registerUser', (user) => {
  cy.request({
    url: 'http://localhost:3003/api/users/register',
    method: 'POST',
    body: user,
  })
})

Cypress.Commands.add('loginUser', (username, password) => {
  cy.request('POST', 'http://localhost:3003/api/users/login', {
    username,
    password
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedUser')).token
      }`,
    },
  })

  cy.visit('http://localhost:3000')
})