/// <reference types="Cypress" />
import { faker } from '@faker-js/faker'
import userPage from '../../../model/user'

let password = faker.random.alphaNumeric(8)
let email = faker.internet.email()
let email1 = faker.internet.email()

describe('View User', () => {
  before(() => {
    cy.visit('/')
    cy.loginAccount()
    cy.createUser(email,password)
  })

  it('C2248	- sort user by name Desc should be success ', function () {
    cy.reload()
    cy.get('.list-sort-dir').click()
    cy.wait(3000)
  })

  it('C2247	- search with not registered user should be fail ', function () {
    cy.get('.block > form > input').type(password).type('{enter}')
  })

  it('C2246	- search with registered user should be success ', function () {
    cy.visit('/')
    cy.loginAccount()
    cy.createUser(email1,password)
    cy.get('.block > form > input').type(email1).type('{enter}')
    cy.get('.flex-2').should('be.visible')
  })

  it('C2249	- sort user by name ASC should be success ', function () {
    cy.visit('/')
    cy.loginAccount()
    cy.visit('/settings/users')
    cy.get('.block > form > input').type(email1).type('{enter}')
    cy.get('.flex-2').should('be.visible')
  })

})
