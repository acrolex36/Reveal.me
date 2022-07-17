describe('Homepage test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
        cy.findByLabelText(/Email address/i)
            .clear()
            .type('frontend@test.com');
        cy.findByLabelText(/Password/i)
            .clear()
            .type('frontend@test.com');

        cy.contains('Sign in').click();
        cy.server()

    })


    it('should call rejectUser when swiping left', () => {
        cy.contains('David, 26').should('be.visible')
        cy.route('PUT', '/api/user/profile/swipedLeft/id/*/*').as('rejectUser')
        cy.get('#swipeLeftButton').click()
        cy.wait('@rejectUser').should((xhr) => {
            expect(xhr.status, 'rejectUser').to.equal(200)
        })
    })

    it('should call removeOneSwipedUser goBack button is pressed after left swipe', () => {
        cy.route('PUT', '/api/user/profile/swipedleft/remove/id/!*').as('removeOneSwipedUser')
        cy.contains('David, 26').should('be.visible');
        cy.get('#swipeLeftButton').click()
        cy.contains('David, 26').should('not.be.visible');
        cy.get('#goBackButton').click()
        cy.wait('@removeOneSwipedUser').should((xhr) => {
            expect(xhr.status, 'removeOneSwipedUser').to.equal(200)
        })
    })


    // it('Should call updateMatchUserById when swiping right with a user that is not a match', () => {
    //     cy.route('PUT', '/api/user/profile/id/*/*').as('updateMatchUserById')
    //     cy.contains('David, 26').should('be.visible');
    //     cy.get('#swipeRightButton').click()
    //     cy.wait('@updateMatchUserById').should((xhr) => {
    //         expect(xhr.status, 'updateMatchUserById').to.equal(200)
    //     })
    // })


// it('Should call goBack button is pressed after right swipe', () => {
//     cy.route('GET', '/api/allconversation/:userId/id/*').as('getConversation')
//     cy.route('DELETE', '/api/conversation/remove/*').as('deleteConversation')
//
//     cy.contains('David, 26').should('be.visible');
//     cy.get('#swipeRightButton').click()
//     cy.contains('David, 26').should('not.be.visible');
//     cy.get('#goBackButton').click()
//     cy.wait('@getConversation').should((xhr) => {
//         expect(xhr.status, 'getConversation').to.equal(200)
//     })
// })



})
