const axios = require('axios');
const fsExtra = require('fs-extra');

export default ({ app, configuration }) => {
  app.get('/redirects/refresh/:token', (req, res) => {
    const token = req.params.token;

    if (token === configuration.redirectsRefreshToken) {
      axios.get(`${configuration.odooBaseUrl}vsf/redirects`)
        .then(async ({data}) => {
          await fsExtra.writeJson('helpers/redirects.json', data);
        });

      return res.send('Refresh redirects succcefuly!');
    }

    return res.send('Wrong redirect token');

  });
};
