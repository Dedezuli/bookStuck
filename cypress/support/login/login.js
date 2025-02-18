/// <reference types="Cypress" />
import userData from '../../fixtures/data/user.json'
import loginPage from '../../model/login'
import { faker } from '@faker-js/faker'
import userPage from '../../model/user'

Cypress.Commands.add('createUser', function (email,password) {
  cy.visit('/settings/users/create')
  cy.viewport(1920, 1080)
  cy.get(userPage.nameInput).click().type(faker.name.fullName())
  cy.get(userPage.emailInput).click().type(email)
  cy.get(userPage.checkbox1).click()
  cy.get(userPage.checkbox2).click()
  cy.get(userPage.checkbox3).click()
  cy.get(userPage.passwordInput).click().type(password)
  cy.get(userPage.passwordConfirmInput).click().type(password)
  cy.get(userPage.submitButton).click()
  cy.url().should('include', '/settings/users')
})

Cypress.Commands.add('loginAccount', function () {
  cy.visit('/login')
  cy.viewport(1920, 1080)
  cy.get(loginPage.usernameInput).clear().type(userData.email) 
  cy.get(loginPage.passwordInput).clear().type(userData.password) 
  cy.get(loginPage.loginBtn).click()
  cy.url().should('include', 'https://demo.bookstackapp.com')
})
