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
        },
        {
          name: 'cookieExtension',
          hooks: (req, res) => {

            return {
              beforeCreate: ({ configuration }) => ({
                ...configuration,
                auth: req.headers.cookie,
                'resquest-host': 'vue-dev.greenmind.space'
              }),
              beforeCall: ({ configuration, callName, args }) => args,
              afterCall: ({ configuration, callName, response }) => response
            };
          }
        }
      ],
      customQueries

    },
    sb: {
      location: '@vue-storefront/storyblok/server',
      configuration: {
        token: '0vS0uwQC7Ym1Wuf2siDT6gtt',
        cacheProvider: 'memory'
      }
    }
  }
};

