const odooBaseUrl = process.env.BACKEND_BASE_URL || process.env.BASE_URL || 'https://web-dev.greenmind.space/';
const redirectsInvalidateToken = process.env.REDIRECT_INVALITION_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJncmVlbi1taW5kIiwibmFtZSI6Im9kb28iLCJpYXQiOjE1MTYyMzkwMjJ9.xCX61aKwPVveUAXFiH8BT2aS3gf_BmuJ9eJfcm5s9zE';
const graphqlBaseUrl = `${odooBaseUrl}graphql/vsf`;
const customQueries = require('./green-api/customQueries');
const apis = require('./green-api/api');

module.exports = {
  integrations: {
    odoo: {
      location: '@vue-storefront/odoo-api/server',
      configuration: {
        odooBaseUrl,
        graphqlBaseUrl,
        redirectsInvalidateToken
      },
      extensions: (extensions) => [
        ...extensions,
        {
          name: 'green-extension',
          extendApiMethods: apis
        },
        {
          name: 'redirect-extension',
          extendApp: ({ app, configuration }) => {
            app.get('/redirects/invalidate/:token', (req, res) => {
              const token = req.params.token;
              if (token === configuration.redirectsInvalidateToken) {
                return res.send('OK TOKEN');
              }

              return res.send('NOTHING');

            });
          }
        }
      ],
      customQueries

    }
  }
};

