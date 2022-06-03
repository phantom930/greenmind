const fsExtra = require('fs-extra');

export default ({ app, configuration }) => {
  app.get('/redirects/:token', (req, res) => {
    const token = req.params.token;

    if (token === configuration.redirectsRefreshToken) {
      const data = fsExtra.readFileSync('customRoutes/redirects.json');

      return res.send(data);
    }

    return res.send('Wrong redirect token');

  });
};
