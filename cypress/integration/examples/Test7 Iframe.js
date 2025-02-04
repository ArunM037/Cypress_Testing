/// <reference types="cypress" />

import 'cypress-iframe'

describe('Test 8', function () {
    it('Test 8', function () {
        cy.visit(Cypress.env("URL") + "/AutomationPractice/")
        cy.frameLoaded('#courses-iframe')
        cy.iframe().find('a[href*="mentorship"]').eq(0).click()
        cy.wait(5000)
        cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2)
    })
})