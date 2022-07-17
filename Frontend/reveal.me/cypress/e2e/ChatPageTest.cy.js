import {worker} from "../../src/mocks/worker";

describe('Chat page', () => {
    beforeEach(() => {
        worker.start();
        cy.viewport(1279, 874)
        //login
        cy.visit('http://localhost:3000/login')
        cy.findByLabelText(/Email address/i)
            .clear()
            .type('bryan@test.com');
        cy.findByLabelText(/Password/i)
            .clear()
            .type('test123.com');

        cy.get('button[type=submit]').click();

    })

    it('Sucessfully opens chat page, choose conversation and send message', () => {
        //open message
        cy.get('#messages').click();
        cy.get('#titlePage').should('be.visible')

        //open one of conversation
        cy.get('#convoList').should('be.visible')
        cy.get('#convoList').click();

        //topProfile should be visible
        cy.get("#topImage").should('be.visible')
        cy.get("#topName").should('be.visible')
        cy.get("#topDetail").should('be.visible')

        //chat bubble span should be visible
        cy.contains('frontend test2').should('be.visible')
        cy.get('img').should('be.visible')
        cy.get('div[id="messageBubble"]').should('be.visible')
        cy.wait(500)
        
        //right profile should be visible
        cy.get("#cardImage").should('be.visible')
        cy.get("#rightDetail").should('be.visible')
        cy.get("#inputArea").should('be.visible')
        cy.get("#rightOccupation").should('be.visible')
        cy.get("#rightDescription").should('be.visible')

        //input message and send message
        cy.get("#inputArea").should('be.visible')
        cy.get('input[type = text]')
        .clear()
        .type("let's hangout sometime!")
        cy.get('#sendMessage').click()
        
        //input picture as message and send message
        cy.get("input[type=file]")
            .attachFile("girl.png")
        cy.get('#sendMessage').click()
        
        //the sent message should be visible
        cy.get('span[id="5"]').should('be.visible');
        cy.get('img[id="5"]').should('be.visible');
        cy.get('img[id="imageMessage6"]').should('be.visible');
        cy.get('img[id="6"]').should('be.visible');
 
    })



})
