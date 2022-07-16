describe('Chat page', () => {
    beforeEach(() => {

        cy.visit('http://localhost:3000/login')
        cy.findByLabelText(/Email address/i)
            .clear()
            .type('frontend@test.com');
        cy.findByLabelText(/Password/i)
            .clear()
            .type('frontend@test.com');

        cy.contains('Sign in').click();

        // cy.getCookie('Token', {timeout: 10000})
        //     .should('have.property', 'value', 'testToken')
        // cy.getCookie('UserId')
        //     .should('have.property', 'value', 'test')
    })

    it('Sucessfully opens chat page ', () => {
        cy.get('#messages').click();
        cy.wait(5000)

    })


})
