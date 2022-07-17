describe('Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
    })

    it('Sucessfully logs in and sets cookies ', () => {
        cy.findByLabelText(/Email address/i)
            .clear()
            .type('frontend@test.com');
        cy.findByLabelText(/Password/i)
            .clear()
            .type('frontend@test.com');

        cy.contains('Sign in').click();

        cy.getCookie('Token')
            .should('have.property', 'value', 'testToken')
        cy.getCookie('UserId')
            .should('have.property', 'value', 'Frontend')

    })


})
