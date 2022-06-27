import {
  baseDomain,
  rebuildRefreshToken,
  odooBaseUrl
} from './ENV';

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

