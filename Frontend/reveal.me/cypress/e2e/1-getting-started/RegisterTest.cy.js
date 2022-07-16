
describe('Register', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register')
    })

    it('Sucessfully register and direct to create profile page ', () => {
        cy.findByLabelText(/First Name/i)
            .clear()
            .type('frontend');
        cy.findByLabelText(/Last Name/i)
            .clear()
            .type('test');
        cy.findByLabelText(/Email/i)
            .clear()
            .type('frontendEmail@test.com');
        cy.get('#password')
            .type('test123');
        cy.get('#confirmPassword')
            .type('test123');
        cy.contains('Create an Account').click();

        cy.setCookie('Token', 'testToken1')
        cy.setCookie('UserId', 'test1')

        cy.getCookie('UserId')
            .should('have.property', 'value', 'test1')
        cy.getCookie('Token')
            .should('have.property', 'value', 'testToken1')

    })
})
