/// <reference types="cypress" />

import { loginPage } from "../models/login";

describe('Cypress', () => {

  it('Round 1: Element Interaction', () => {

    cy.visit('https://demo.applitools.com/')

    cy.get('#username').type('filip')
    cy.get('#password').type('i<3slovakia!')
    cy.get('#log-in').click()

    cy.contains('.element-header', 'Financial Overview')
      
  });

  it('Round 2: File Upload', () => {

    cy.visit("https://kitchen.applitools.com/ingredients/file-picker");

    cy.get('#photo-upload')
      .selectFile('../images/banner.png')
      
  });

  it('Round 3: Inline Frames', () => {

    cy.visit('https://kitchen.applitools.com/ingredients/iframe')

    cy.iframe('#the-kitchen-table')
      .find('#fruits-vegetables')
      .should('be.visible')
      
  });

  it('Round 4: Waiting', () => {

    cy.visit('https://automationbookstore.dev/')

    cy.get('#searchBar').type('testing')
    cy.get('li:visible').should('have.length', 1)
      
  });

  it('Round 5: Accept Alerts', () => {

    cy.visit('https://kitchen.applitools.com/ingredients/alert')

    cy.get('#alert-button').click()
    cy.on('window:alert', (alert) => {
      expect(alert).to.eq('Airfryers can make anything!')
    })
      
  });

  it('Round 5: Dismiss Alerts', () => {

    const dismiss = () => false
    
    cy.visit('https://kitchen.applitools.com/ingredients/alert')

    cy.get('#confirm-button').click()
    cy.on('window:confirm', dismiss)
      
  });

  it('Round 5: Answer Prompts', () => {

    cy.visit('https://kitchen.applitools.com/ingredients/alert', {
      onLoad(win: Window) {
        cy.stub(win, 'prompt')
          .returns('Hi mom!');
      }
    })

    cy.get('#prompt-button').click()
      
  });

  it('Round 6: Navigation to New Windows', () => {

    cy.visit('https://kitchen.applitools.com/ingredients/links')
    
    cy.get('#button-the-kitchen-table')
      .invoke('removeAttr', 'target')
      .click()

    cy.location('pathname')
      .should('eq', '/ingredients/table')
      
  });

  it('Round 7: API Requests', () => {

    cy.request('https://kitchen.applitools.com/api/recipes')
      .then(({ status, body, duration }) => {
        expect(status).to.eq(200)
        expect(body.data).to.have.length.greaterThan(0)
        expect(duration).to.be.greaterThan(0)
      })
      
  });

  it('Round 8: Page Objects', () => {

    loginPage
      .load()
      .login('filip', 'i<3slovakia!')

      cy.contains('.element-header', 'Financial Overview')

  });

});