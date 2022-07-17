import {worker} from "../../src/mocks/worker";

describe('Login', () => {

    beforeEach(() => {
        worker.start();
        cy.visit('http://localhost:3000/login')
    })

    it('Sucessfully logs in and sets cookies ', () => {
        cy.findByLabelText(/Email address/i)
            .clear()
            .type('frontend@test.com');
        cy.findByLabelText(/Password/i)
            .clear()
            .type('frontend@test.com');

        cy.get('button[type=submit]').click();

        cy.wait(1000)

        cy.getCookie('Token')
            .should('have.property', 'value', 'testToken')
        cy.getCookie('UserId')
            .should('have.property', 'value', 'Frontend')

    })


})
