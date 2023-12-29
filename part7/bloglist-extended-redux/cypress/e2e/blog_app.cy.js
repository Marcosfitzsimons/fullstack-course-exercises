describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = { name: 'Julieta Gordillo', username: 'juli', password: 'asdasd' }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function () {
    cy.contains('blogs')
  })

  it('login form can be opened and login form is showed', function () {
    cy.contains('Log In').click()
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })


  describe('Login', function () {
    it('user can logged in', function () {
      cy.contains('Log In').click()
      cy.get('input:first').type('juli')
      cy.get('input:last').type('asdasd')
      cy.get('#login-button').click()
      cy.contains('Julieta Gordillo logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('Log In').click()
      cy.get('input:first').type('juli')
      cy.get('input:last').type('asdasdd')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials').should('have.class', 'error')
    })
  })


  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'juli', password: 'asdasd' })
    })

    it('a new blog can be created', function () {
      cy.contains('Add New Blog').click()
      cy.get('#title').type('learn fullstack development')
      cy.get('#author').type('Julieta Gordillo')
      cy.get('#url').type('www.learnfullstack.com')
      cy.contains('Create').click()
      cy.contains('learn fullstack development')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'another blog cypress', author: 'Julieta Gordillo', url: "www.asdasd.com" })
      })

      it('it can be made important', function () {
        // ...
      })
    })

  })

})