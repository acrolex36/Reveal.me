describe('Chat page', () => {
    beforeEach(() => {

        cy.visit('http://localhost:3000/login')
        cy.findByLabelText(/Email address/i)
            .clear()
            .type('frontend@test3.com');
        cy.findByLabelText(/Password/i)
            .clear()
            .type('test123');

        cy.contains('Sign in').click();

        cy.getCookie('Token')
            .should('have.property', 'value', 'testToken')
        cy.getCookie('UserId')
            .should('have.property', 'value', 'test')

    })

    it('Sucessfully opens chat page ', () => {
        cy.get('#messages').click();

    })


})
