/// <reference types="Cypress" />
import userData from '../../../fixtures/data/user.json'
import loginPage from '../../../model/login'

describe('Login Sanity', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.viewport(1920, 1080)

  })
  it('C2242 -	Login with valid credential should be success', () => {
    cy.get(loginPage.usernameInput).clear().type(userData.email)
    cy.get(loginPage.passwordInput).clear().type(userData.password)
    cy.get(loginPage.loginBtn).click()
    cy.url().should('include', '/')
  })

  it('C2243 -	Login with an unregister email should be fail', () => {
    cy.get(loginPage.usernameInput).clear().type(userData.emailInvalid)
    cy.get(loginPage.passwordInput).clear().type(userData.password)
    cy.get(loginPage.loginBtn).click()
    cy.get('.text-small').should('contain','The email must be a valid email address.') 
    cy.url().should('include', '/')
  })

  it('C2244	- Login with an incorrect password should be fail', () => {
    cy.get(loginPage.usernameInput).clear().type(userData.email)
    cy.get(loginPage.passwordInput).clear().type(userData.email)
    cy.get(loginPage.loginBtn).click()
    cy.get('.text-small').should('contain','These credentials do not match our records.') 
    cy.url().should('include', '/')
  })
  
  it('CC2245 - Login without entering email & password should be fail', () => {
    cy.get(loginPage.usernameInput).clear()
    cy.get(loginPage.passwordInput).clear()
    cy.get(loginPage.loginBtn).click()
    cy.get('.text-small').should('be.visible') 
    cy.url().should('include', '/')
  })
})
