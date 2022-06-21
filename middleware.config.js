const odooBaseUrl = process.env.BACKEND_BASE_URL || process.env.BASE_URL || 'https://web-dev.greenmind.space/';
const rebuildRefreshToken = process.env.INVALIDATION_KEY || '0ead60c3-d118-40be-9519-d531462ddc60';
const baseDomain = process.env.BASE_DOMAIN || 'vue-dev.greenmind.space';
const graphqlBaseUrl = `${odooBaseUrl}graphql/vsf`;
const customQueries = require('./green-api/customQueries');
const apis = require('./green-api/api');
const rebuildExtension = require('./helpers/rebuildExtension');

module.exports = {
  integrations: {
    odoo: {
      location: '@vue-storefront/odoo-api/server',
      configuration: {
        odooBaseUrl,
        graphqlBaseUrl,
        rebuildRefreshToken,
        baseDomain
      },
      extensions: (extensions) => [
        ...extensions,
        {
          name: 'green-extension',
          extendApiMethods: apis
        },
        {
          name: 'rebuild-extension',
          extendApp: rebuildExtension.default
        }
      ],
      customQueries

    }
  }
};

