describe('Explore page', () => {
    beforeEach(() => {
        cy.viewport(1279, 874)
        //login
        cy.visit('http://localhost:3000/login')
        cy.findByLabelText(/Email address/i)
            .clear()
            .type('frontend@test.com');
        cy.findByLabelText(/Password/i)
            .clear()
            .type('frontend@test.com');

        cy.get('button[type=submit]').click();
        cy.get('#exploreusers').click();
    })

    it('Should call Getgendereduser after page load', () => {
        cy.server();
        cy.route('GET', '/api/gendereduser/id/*').as('getGenderedUser')
        cy.wait('@getGenderedUser').should((xhr) => {
            expect(xhr.status, 'getGenderedUser').to.equal(200)
        })
    })

    it('Shows users according to hobbies', () => {
        cy.get('select').select('Photography')
        cy.contains('Kevin').should('be.visible');
        cy.contains('David').should('be.visible');
        cy.get('select').select('Cooking')
        cy.contains('Jenna').should('be.visible');
    })

    it('Calls createConversation and deleteOneMatch when matching someone that already matched back', () => {
        cy.server()
        cy.route("POST", "/api/conversation/message/*/*").as("createConversation")
        cy.route("PUT", "/api/user/profile/remove/id/*/*").as("deleteOneMatch")

        cy.get('select').select('Photography')
        cy.contains('Kevin').click();
        cy.get('#matchButtonKevin').click();

        cy.wait('@createConversation').should((xhr) => {
            expect(xhr.status, 'createConversation').to.equal(200)
        })
        cy.wait('@deleteOneMatch').should((xhr) => {
            expect(xhr.status, 'deleteOneMatch').to.equal(200)
        })
        cy.on('window:alert', (text) => {
            expect(text).to.contains(`IT'S A MATCH!`);
        });
        cy.get('#matchButtonKevin').should('be.disabled')
    })

    it('call updateMatchUserById when matching someone that havent match back', () => {
        cy.server()
        cy.route('PUT', '/api/user/profile/id/*/*').as('updateMatchUserById')
        cy.get('select').select('Cooking')
        cy.contains('Jenna').click();
        cy.get('#matchButtonJenna').click();
        cy.wait('@updateMatchUserById').should((xhr) => {
            expect(xhr.status, 'updateMatchUserById').to.equal(200)
        })
        cy.get('#matchButtonJenna').should('be.disabled')
    })


})
