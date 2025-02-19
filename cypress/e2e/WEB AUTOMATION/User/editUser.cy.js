/// <reference types="Cypress" />
import { faker } from '@faker-js/faker'
import userPage from '../../../model/user'

let password = faker.random.alphaNumeric(8)
let email = faker.internet.email()

describe('Edit User', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.loginAccount()
    cy.createUser(email,password)
  })
  // case ini akan failed, karena ekpektasi saya admin bisa edit
  it('C2262 - edit another user with account admin should be success', function () {
    cy.get('.block > form > input').type(email).type('{enter}')
    cy.get('.flex-2').click()
    cy.get(userPage.nameInput).clear().type(faker.name.fullName())
    cy.get(userPage.submitButton).click()
    cy.contains('success').should('be.visible')
  })

  // case ini akan failed, karena ekpektasi saya owner bisa edit
  it('C2264	- edit user with owner user should be success', function () {
    cy.get('.block > form > input').type(email).type('{enter}')
    cy.get('.flex-2').click()
    cy.get(userPage.nameInput).clear().type(faker.name.fullName())
    cy.get(userPage.submitButton).click()
    cy.contains('success').should('be.visible')
  })

  it('C2266	- edit users with accounts that dont have permission should be fail', function () {
    cy.get('.block > form > input').type(email).type('{enter}')
    cy.get('.flex-2').click()
    cy.get(userPage.nameInput).clear().type(faker.name.fullName())
    cy.get(userPage.submitButton).click()
    cy.contains('do not have permission').should('be.visible')
  })
})
