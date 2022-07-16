describe('Logout', () => {
    beforeEach(() => {

        cy.visit('http://localhost:3000/login')
        cy.findByLabelText(/Email address/i)
            .clear()
            .type('frontendEmail@test.com');
        cy.findByLabelText(/Password/i)
            .clear()
            .type('test123');

        cy.contains('Sign in').click();

        // cy.getCookie('Token', {timeout: 10000})
        //     .should('have.property', 'value', 'testToken')
        // cy.getCookie('UserId')
        //     .should('have.property', 'value', 'test')
    })

    it('Sucessfully logs out and emptie cookies ', () => {
        cy.get('#logout').click();
        cy.wait(5000)

        cy.getCookie('Token').should('have.property', 'value', '')
        cy.getCookie('UserId').should('have.property', 'value', '')

    })


})
