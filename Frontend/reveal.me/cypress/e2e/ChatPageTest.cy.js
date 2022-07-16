describe('Chat page', () => {
    beforeEach(() => {
        cy.viewport(1279, 874)
        cy.visit('http://localhost:3000/login')
        cy.findByLabelText(/Email address/i)
            .clear()
            .type('frontend@test.com');
        cy.findByLabelText(/Password/i)
            .clear()
            .type('frontend@test.com');

        cy.contains('Sign in').click();

    })

    it('Sucessfully opens chat page ', () => {
        cy.get('#messages').click();
        cy.get('#convoList').click();

    })


})
