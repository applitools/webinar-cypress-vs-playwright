export const loginPage = {

  /**
   * opens a login page
   */
  load() {
    cy.visit('https://demo.applitools.com/')
    return this
  },

  /**
   * fills in username, password and submits form
   * @param username username of user to log in
   * @param pass password of the user
   */
  login(username: string, pass: string) {

    cy.get('#username').type(username)
    cy.get('#password').type(pass)
    cy.get('#log-in').click()
    return this
  }

}