describe('Logout', () => {
    beforeEach(() => {

        cy.visit('http://localhost:3000/login')
        cy.findByLabelText(/Email address/i)
            .clear()
            .type('frontend@test.com');
        cy.findByLabelText(/Password/i)
            .clear()
            .type('frontend@test.com');

        cy.get('button[type=submit]').click();

    })

    it('Sucessfully logs out and empties cookies ', () => {
        cy.get('#logout').click();

        cy.getCookie('Token').should('have.property', 'value', '')
        cy.getCookie('UserId').should('have.property', 'value', '')

    })


})
