/// <reference types="cypress" />

context('SQL Server', () => {
    it('Database Interaction', () => {
        cy.sqlServer("select * from persons").then(function (result) {
            console.log(result[0][1])
        })
    })
})