/// <reference types = "cypress"/>

describe("Test 8", function () {
    it('Test 8', function () {
        cy.visit(Cypress.env('URL') + "/AutomationPractice/")
        cy.get('#opentab').then(function (el) {
            const url = el.prop('href')
            cy.visit(url)
            cy.origin(url, () => {
                cy.get("div.sub-menu-bar a[href*='about']").click()
            })
        })
    })
})
