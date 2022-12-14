import {worker} from "../../src/mocks/worker";

describe('Homepage', () => {
    beforeEach(() => {
        worker.start();
        cy.visit('http://localhost:3000/login')
        cy.findByLabelText(/Email address/i)
            .clear()
            .type('frontend@test.com');
        cy.findByLabelText(/Password/i)
            .clear()
            .type('frontend@test.com');

        cy.get('button[type=submit]').click();
        cy.server()

        //Wait until data loads
        cy.contains('David, 26').should('be.visible')
    })

    it('Should call rejectUser when swiping left', () => {
        cy.route('PUT', '/api/user/profile/swipedLeft/id/*/*').as('rejectUser')
        cy.get('#swipeLeftButton').click()
        cy.wait('@rejectUser').should((xhr) => {
            expect(xhr.status, 'rejectUser').to.equal(200)
        })
    })

    it('Should call removeOneSwipedUser goBack button is pressed after left swipe', () => {
        cy.route('PUT', '/api/user/profile/swipedleft/remove/id/*').as('removeOneSwipedUser')
        cy.contains('David, 26').should('be.visible');
        cy.get('#swipeLeftButton').click()
        cy.contains('David, 26').should('not.be.visible');
        cy.get('#goBackButton').click()
        cy.wait('@removeOneSwipedUser').should((xhr) => {
            expect(xhr.status, 'removeOneSwipedUser').to.equal(200)
        })
    })

    it('Should call updateMatchUserById when swiping right with a user that havent swiped back', () => {
        cy.route('PUT', '/api/user/profile/id/*/*').as('updateMatchUserById')

        cy.contains('David, 26').should('be.visible');
        cy.get('#swipeRightButton').click()
        cy.wait('@updateMatchUserById').should((xhr) => {
            expect(xhr.status, 'updateMatchUserById').to.equal(200)
        })
    })
    it('Should make conversation and call removeMatchedUser after right swipe with a user that already swiped back', () => {
        cy.route("POST", "/api/conversation/message/*/*").as("createConversation")
        cy.route("PUT", "/api/user/profile/remove/id/*/*").as("deleteOneMatch")

        cy.get('#swipeRightButton').click()
        cy.get('#swipeRightButton').click()

        cy.wait('@createConversation').should((xhr) => {
            expect(xhr.status, 'createConversation').to.equal(200)
        });
        cy.wait('@deleteOneMatch').should((xhr) => {
            expect(xhr.status, 'deleteOneMatch').to.equal(200)
        })

        cy.on('window:alert', (text) => {
            expect(text).to.contains(`IT'S A MATCH!`);
        });
    })

    it('Should call delete conversation and deleteonematch when pressing goback after a match ', () => {
        cy.route('GET', '/api/allconversation/:userId').as('getConversation')
        cy.route('PUT', '/api/conversation/remove/*').as('deleteConversation')
        cy.route("PUT", "/api/user/profile/remove/id/*/*").as("deleteOneMatch")

        cy.get('#swipeRightButton').click()
        cy.get('#swipeRightButton').click()
        cy.get('#goBackButton').click()

        cy.wait('@deleteOneMatch').should((xhr) => {
            expect(xhr.status, 'deleteOneMatch').to.equal(200)
        });
    })

});
