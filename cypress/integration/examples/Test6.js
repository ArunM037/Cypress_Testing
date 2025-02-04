/// <reference types="cypress" />

describe('My Second Test Suite', function () {

    it('My FirstTest case', function () {

        //Check boxes
        cy.visit(Cypress.env("URL") + "/AutomationPractice/")

        //cy.get('div.mouse-hover-content').invoke('show')
        cy.contains('Top').click({ force: true })
        cy.url().should('include', 'top')
    })


})




























