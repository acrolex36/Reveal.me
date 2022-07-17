import {worker} from "../../src/mocks/worker";

describe('Forgot Password', () => {
    beforeEach(() => {
        worker.start();
        cy.visit('http://localhost:3000/login')
    })

    it('Sucessfully reset password', () => {
        cy.contains('Forgot your password?').click();
        cy.get('#email-address')
            .clear()
            .type('frontend@test.com');
        cy.get('#new-password')
            .type('frontend@test.com');
        cy.get('#confirm-new-password')
            .type('frontend@test.com');

        cy.contains(/Reset Password/i).click()

    })

    it('Sucessfully go back to login page when back to sign in is clicked', () => {
        cy.contains('Forgot your password?').click();
        cy.get('#email-address')
            .clear()
            .type('frontend@test.com');
        cy.get('#new-password')
            .type('frontend@test.com');

        cy.contains(/Back to Sign in/i).click()
        cy.contains(/Sign in/i).should('be.visible')
    })

})
