/// <reference types="Cypress" />
import { faker } from '@faker-js/faker'
import userPage from '../../model/user'

let password = faker.random.alphaNumeric(8)
let email = faker.internet.email()

Cypress.Commands.add('createUser', function () {
  cy.visit('/settings/users/create')
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
