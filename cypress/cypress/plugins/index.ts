import 'dotenv/config'

// eslint-disable-next-line no-unused-vars
module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  config.env.pass = process.env.USER_PASSWORD
  return config
}
