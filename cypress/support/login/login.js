/// <reference types="Cypress" />
import userData from '../../fixtures/data/user.json'
import loginPage from '../../model/login'

Cypress.Commands.add('loginAccount', function () {
  cy.visit('/login')
  cy.viewport(1920, 1080)
  cy.get(loginPage.usernameInput).clear().type(userData.email) 
  cy.get(loginPage.passwordInput).clear().type(userData.password) 
  cy.get(loginPage.loginBtn).click()
  cy.url().should('include', 'https://demo.bookstackapp.com')
})
