/// <reference types="Cypress" />
import { faker } from '@faker-js/faker'
import userPage from '../../../model/user'

let password = faker.random.alphaNumeric(8)
let email = faker.internet.email()
describe('Create User', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.loginAccount()
    cy.createUser(email)
    cy.visit('/settings/users/create')
  })

  it('C2251	- create user without input name should be fail', function () {
    cy.get(userPage.nameInput).click()
    cy.get(userPage.emailInput).click().type(faker.internet.email())
    cy.get(userPage.checkbox1).click()
    cy.get(userPage.checkbox2).click()
    cy.get(userPage.checkbox3).click()
    cy.get(userPage.passwordInput).click().type(password)
    cy.get(userPage.passwordConfirmInput).click().type(password)
    cy.get(userPage.submitButton).click()
    cy.get('.text-small').should('contain','The name field is required.')
    cy.url().should('include', '/settings/users/create')
  })
})
