export const loginPage = {

  username: '#username',
  password: '#password',
  log_in: '#log-in',

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

    cy.get(this.username).type(username)
    cy.get(this.password).type(pass)
    cy.get(this.log_in).click()
    return this
  }

}