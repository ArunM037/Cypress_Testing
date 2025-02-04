import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Homepage from '../../../../support/pageObjects/HomePage.js'

let homepage

Given('I am on Ecommerce page', function () {
    homepage = new Homepage()
    homepage.goTo(Cypress.env('URL') + "/loginpagePractise/")
})

When('I login to the application', function () {
    this.homepage = homepage;
    this.productPage = this.homepage.login(this.data.username, this.data.password)
    this.productPage.pageValidation()
    this.productPage.getCardCount().should('have.length', 4)
})

When('I login to the application portal', function (dataTable) {
    this.homepage = homepage;
    this.productPage = this.homepage.login(dataTable.rawTable[1][0], dataTable.rawTable[1][1])
    this.productPage.pageValidation()
    this.productPage.getCardCount().should('have.length', 4)
})

When('I add products to the cart and checkout', function () {
    this.productPage.selectProduct(this.data.productName)
    this.productPage.selectFirstProduct()
    this.cartPage = this.productPage.goToCart()
})

When('Validate the total price limit', function () {
    this.cartPage.sumOfProducts().then(function (sum) {
        expect(sum).to.be.lessThan(200000);
    })
})

Then('select the country submit and verify the purchase', function () {
    const confirmationPage = this.cartPage.checkoutItems()
    confirmationPage.submitFormDetails()
    confirmationPage.getAlertMessage().should('contain', 'Success')
})