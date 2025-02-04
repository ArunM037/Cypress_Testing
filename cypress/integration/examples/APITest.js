describe('API Test', () => {
    it('API Test', () => {
        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php', {

            "name": "Learn Appium Automation with Java",
            "isbn": "bcd890",
            "aisle": "227",
            "author": "Elena Gilberts"
        }).then((response) => {
            expect(response.body).to.have.property("Msg", "successfully added")
        })
    })
})