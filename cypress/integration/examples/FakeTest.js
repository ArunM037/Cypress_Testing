/// <reference types="cypress" />

describe('Fake Test', () => {
    it('Fake API Tesr', () => {
        cy.visit(Cypress.env('URL') + '/angularAppdemo/');

        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        }, {
            statusCode: 200,
            body: [
                {
                    "book_name": "RestAssured with Java",
                    "isbn": "LSA",
                    "aisle": "2303"
                },
            ]
        }).as('bookretrievals');
        cy.get('button[class="btn btn-primary"]').click();
        cy.wait('@bookretrievals').then(({ request, response }) => {
            cy.get('tr').should('have.length', response.body.length + 1)
        })
        cy.get('p').should('have.text', 'Oops only 1 Book available')

        // length of the response array = rows of the table


    })
})
