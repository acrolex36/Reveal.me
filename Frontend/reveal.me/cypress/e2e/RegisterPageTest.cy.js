
describe('Register', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register')
    })

    it('Sucessfully register and direct to create profile page ', () => {
        //input fields
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
        
        //should receive UserId and Token and directed to create profile page
        cy.getCookie('UserId')
            .should('have.property', 'value', 'test3')
        cy.getCookie('Token')
            .should('have.property', 'value', 'testToken3')

    })
})
