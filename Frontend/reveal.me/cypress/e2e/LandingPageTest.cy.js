
describe('Landing page test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('Button should link to register page', () => {
        cy.contains('Create an Account').click();
        cy.url().should('include', '/register')
    })

    it('Button should link to login page', () => {
        cy.contains('Sign in').click();
        cy.url().should('include', '/login')
    })



})
