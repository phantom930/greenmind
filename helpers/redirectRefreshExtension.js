const axios = require('axios');
const fsExtra = require('fs-extra');

export default ({ app, configuration }) => {
  app.get('/redirects/refresh/:token', async (req, res) => {
    const token = req.params.token;

    if (token === configuration.redirectsRefreshToken) {
      const { data } = await axios.get(`${configuration.odooBaseUrl}vsf/redirects`);
      await fsExtra.writeJson('customRoutes/redirects.json', data);

      return res.send('Refresh redirects succcefuly!');
    }

    return res.send('Wrong redirect token');

  });
};
