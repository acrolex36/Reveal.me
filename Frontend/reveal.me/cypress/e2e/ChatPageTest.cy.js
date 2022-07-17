
describe('Chat page', () => {
    beforeEach(() => {
        cy.viewport(1279, 874)
        cy.visit('http://localhost:3000/login')
        cy.findByLabelText(/Email address/i)
            .clear()
            .type('bryan@test.com');
        cy.findByLabelText(/Password/i)
            .clear()
            .type('test123.com');

        cy.contains('Sign in').click();

    })

    it('Sucessfully opens chat page ', () => {
        cy.get('#messages').click();
        cy.get('#convoList').click();
        cy.contains('frontend test2').should('be.visible')
        cy.get('img').should('be.visible')
        cy.wait(2000)
        
        cy.get('input[type = text]')
        .clear()
        .type("let's hangout sometime!")
        cy.get('#sendMessage').click()
        cy.get('span[id="5"]').should('be.visible');
        cy.get("input[type=file]")
        .attachFile("girl.png")
        cy.wait(2000)
        cy.get('#sendMessage').click()
 
    })



})
