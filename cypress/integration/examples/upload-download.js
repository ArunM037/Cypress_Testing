describe('upload-download test', () => {
    it('verify  excel upload download', () => {
        const replacenum = 450
        const searchText = 'Mango';
        const filepath = Cypress.config('fileServerFolder') + "/cypress/downloads/download.xlsx";
        cy.visit('https://rahulshettyacademy.com/upload-download-test/index.html')
        cy.get('#downloadButton').click()
        cy.task('ExcelTest', { searchText: searchText, replaceText: replacenum, Change: { row: 0, column: 2 }, filepath: filepath })
        cy.get('#fileinput').selectFile(filepath)

        cy.contains(searchText).parent().parent().find('#cell-4-undefined').should('have.text', replacenum)
    })
})