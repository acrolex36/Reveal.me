import {worker} from "../../src/mocks/worker";

describe('Landing page', () => {
    beforeEach(() => {
        worker.start();
        cy.visit('http://localhost:3000/')
    })

    it('Register button should link to register page', () => {
        cy.contains('Create an Account').click();
        cy.url().should('include', '/register')
    })

    it('Login button should link to login page', () => {
        cy.contains('Sign in').click();
        cy.url().should('include', '/login')
    })

})
