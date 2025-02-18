/// <reference types="Cypress" />
import { faker } from '@faker-js/faker'
import userPage from '../../../model/user'

let password = faker.random.alphaNumeric(8)
let email = faker.internet.email()

describe('Delete User', () => {
  before(() => {
    cy.visit('/')
    cy.loginAccount()
    cy.createUser(email,password)
  })

it('C2265	- delete users with accounts that dont have permission should be fail', function () {
    cy.get(userPage.search).type(email).type('{enter}')
    cy.get(userPage.userList).click()
    cy.contains('Delete User').click()
    cy.get(userPage.submitButton).click()
    cy.contains('do not have permission').should('be.visible')
  })

  // case ini akan failed, karena ekpektasi saya admin bisa delete
  it('C2263	- delete another user with account admin should be success', function () {
    let email1 = faker.internet.email()
    cy.visit('/')
    cy.loginAccount()
    cy.createUser(email1,password)
    cy.get(userPage.search).type(email1).type('{enter}')
    cy.get(userPage.userList).click()
    cy.contains('Delete User').click()
    cy.get(userPage.submitButton).click()
    cy.contains('success').should('be.visible')
  })  
})