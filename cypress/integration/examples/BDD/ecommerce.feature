Feature: End to End Ecommerce Application
    @Regression
    Scenario: Ecommerce products delivery
        Given I am on Ecommerce page
        When I login to the application
        And I add products to the cart and checkout
        And Validate the total price limit
        Then select the country submit and verify the purchase

    @Smoke
    Scenario Outline: Ecommerce products delivery cucumber data driven
        Given I am on Ecommerce page
        When I login to the application portal
            | username           | password |
            | rahulshettyacademy | learning |
        And I add products to the cart and checkout
        And Validate the total price limit
        Then select the country submit and verify the purchase