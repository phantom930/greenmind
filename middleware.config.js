const odooBaseUrl = process.env.BACKEND_BASE_URL || process.env.BASE_URL || 'https://web-dev.greenmind.space/';
const graphqlBaseUrl = `${odooBaseUrl}graphql/vsf`;
const customQueries = require('./green-api/customQueries');

module.exports = {
  integrations: {
    odoo: {
      location: '@vue-storefront/odoo-api/server',
      configuration: {
        odooBaseUrl,
        graphqlBaseUrl
      },
      customQueries

    }
  }
};

