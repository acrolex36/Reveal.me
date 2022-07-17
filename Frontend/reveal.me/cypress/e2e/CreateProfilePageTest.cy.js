describe('Register', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register')
    })

    it('Sucessfully register and direct to create profile page ', () => {
        //register
        cy.findByLabelText(/First Name/i)
            .clear()
            .type('frontend');
        cy.findByLabelText(/Last Name/i)
            .clear()
            .type('test2');
        cy.findByLabelText(/Email/i)
            .clear()
            .type('frontendEmail@test2.com');
        cy.get('#password')
            .type('test123');
        cy.get('#confirmPassword')
            .type('test123');
        cy.contains('Create an Account').click();

    })
})

describe('Create Profile', () => { 
    it('Successfully create a profile and direct to homepage', () =>{
        //upload file to the input field
        cy.get("input[type=file]")
        .attachFile("girl.png")
    
        //select gender
        cy.get('#gender').select('Female').should('have.value', 'female')

        //input height
        cy.findByLabelText(/Height/i)
            .clear()
            .type('165');
        
        //input nationality
        cy.get('#nationality').select('American').should('have.value', 'american')

        //select language
        cy.contains('Select Language').click()
        cy.get('[type="checkbox"]').check(['English', 'German', 'Korean', 'Indonesia'])
        cy.contains(/OK/i).click()

        //input occupation
        cy.findByLabelText(/Occupation/i)
            .clear()
            .type('Student at Hochschule Darmstadt')
        
        //input dob
        cy.get('[type="date"]')
            .type('2000-10-10')
         
        //input description
        cy.findByLabelText(/Description/i)
            .type('im a fun girl who loves to code!')
        
        //select hobby
        cy.get('[type="checkbox"]').check(['Reading', 'Watch TV Shows and Movies', 'Cooking', 'Travelling'])

        //select gender interest
        cy.get('[type="checkbox"]').check('male')

        //submit details profile
        cy.contains(/Submit/i).click()

        //set cookies
        cy.setCookie('UserId', 'test2')
        cy.setCookie('Token', 'testToken2')

        cy.contains(/Reveal.me/i)
        
    });
    
});
