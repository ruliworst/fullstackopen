describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.registerUser({ username: 'ruliworst', password: 'ruli1234', name: 'Ruli Worst' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('ruliworst')
      cy.get('input:last').type('ruli1234')

      cy.contains('login').click()
      cy.contains('Ruli Worst logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('ruliworst')
      cy.get('input:last').type('ruli1235')

      cy.contains('login').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.loginUser('ruliworst', 'ruli1234')
    })

    it('A blog can be created', function() {
      cy.contains('create').click()

      cy.get('input[name="Title"]').type('Creating a new blog from Cypress')
      cy.get('input[name="Author"]').type('Ngolo Kanté')
      cy.get('input[name="Url"]').type('https://blogepico.com/')

      cy.contains('create blog').click()
      cy.contains('Creating a new blog from Cypress')
      cy.contains('view')
    })

    it('User can delete a blog if it is the creator', function() {
      cy.contains('create').click()
      cy.get('input[name="Title"]').type('Creating a new blog from Cypress')
      cy.get('input[name="Author"]').type('Ngolo Kanté')
      cy.get('input[name="Url"]').type('https://blogepico.com/')
      cy.contains('create blog').click()

      cy.contains('view').click()
      cy.contains('delete').click()
    })

    describe('Existing blogs', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'blog1',
          author: 'author1',
          url: 'https://www.url1.com/',
        })
        cy.createBlog({
          title: 'blog2',
          author: 'author2',
          url: 'https://www.url2.com/',
        })
        cy.createBlog({
          title: 'blog3',
          author: 'author3',
          url: 'https://www.url3.com/',
        })
      })

      it('User can like a blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()
      })

      it('they are ordered by the number of likes in descending order', async function () {
        cy.get('.blog').contains('blog2').contains('view').click()
        cy.get('.blog').contains('blog2').contains('like').click().wait(500).click().wait(500)

        cy.get('.blog').contains('blog3').contains('view').click()
        cy.get('.blog').contains('blog3').contains('like').click().wait(500).click().wait(500).click().wait(500).click().wait(500).click().wait(500).click().wait(500).click().wait(500)

        cy.get('.blog').contains('blog1').contains('view').click()

        cy.get('.blog').eq(0).contains('blog3')
        cy.get('.blog').eq(1).contains('blog2')
        cy.get('.blog').eq(2).contains('blog1')
      })
    })
  })
})