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
        cy.get('.order-summary button ').eq(1).click()
        const filepath = Cypress.config('fileServerFolder') + "/cypress/downloads/order-invoice_ariarya_1237.xlsx";
        cy.task('excelToJsonConverter', filepath).then((result) => {
            console.log(result)
            const actual_product = result.data[1].B
            expect(product_name).to.equal(actual_product)
            cy.log(result.data[1].A)
        })
        cy.readFile(filepath).then((Text) => {
            expect(Text).to.include(product_name)
        })
        //Browser(Engine) - jsCode -> client side Enviroment - cypress

        //Node (Engine) - jsCode -> Back End application/Environment
        //Accessing File System - fs,Database

        //Task-(files,DB) ->Config.js,(ExcelToJson) -> cy.task(Excel to json )
    })
})