/// <reference types="cypress" />
const neatCSV = require('neat-csv')
describe('Session Test', () => {
    let product_name
    it('is logged in through local storage ', async () => {
        cy.LoginAPI().then(() => {
            cy.visit('https://rahulshettyacademy.com/client', {
                onBeforeLoad: function (window) {
                    window.localStorage.setItem('token', Cypress.env('token'));
                }
            });
        })
        cy.get('.card-body b').eq(1).then((element) => {
            product_name = element.text()
        })
        cy.get('.card-body button:last-of-type').eq(1).click();
        cy.get('[routerlink*="cart"]').click()
        cy.contains('Checkout').click()
        cy.get("[placeholder*='Country']").type("ind")

        cy.get('.ta-results button').each(($e1, index, $list) => {
            if ($e1.text() === " India") {
                cy.wrap($e1).click()
            }
        })
        cy.get(".action__submit").click();
        cy.wait(2000)
        cy.get('.order-summary button ').eq(0).click()
        cy.get('.order-summary button ').eq(1).click()
        cy.readFile(Cypress.config('fileServerFolder') + "/cypress/downloads/order-invoice_ariarya_1237.csv").then(async (Text) => {
            const csv = await neatCSV(Text)
            console.log(csv)
            const actul_product = csv[0]["Product Name"]
            expect(product_name).to.equal(actul_product)
        })
    })
})