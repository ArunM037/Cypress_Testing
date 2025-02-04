class ConfirmationPage {

    submitFormDetails() {
        cy.submitDetails()
    }

    getAlertMessage() {
        return cy.get(".alert-success")
    }


}
export default ConfirmationPage