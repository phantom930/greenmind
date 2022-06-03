const odooBaseUrl = process.env.BACKEND_BASE_URL || process.env.BASE_URL || 'https://web-dev.greenmind.space/';
const redirectsRefreshToken = process.env.REDIRECT_INVALITION_TOKEN || 'green-123';
const graphqlBaseUrl = `${odooBaseUrl}graphql/vsf`;
const customQueries = require('./green-api/customQueries');
const apis = require('./green-api/api');
const redirectExtension = require('./helpers/redirectExtension');
const redirectRefreshExtension = require('./helpers/redirectRefreshExtension');

module.exports = {
  integrations: {
    odoo: {
      location: '@vue-storefront/odoo-api/server',
      configuration: {
        odooBaseUrl,
        graphqlBaseUrl,
        redirectsRefreshToken
      },
      extensions: (extensions) => [
        ...extensions,
        {
          name: 'green-extension',
          extendApiMethods: apis
        },
        {
          name: 'redirect-extension',
          extendApp: redirectExtension.default
        },
        {
          name: 'redirect-refresh-extension',
          extendApp: redirectRefreshExtension.default
        }
      ],
      customQueries

    }
  }
};

