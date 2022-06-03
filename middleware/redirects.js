const axios = require('axios');
export default async ({ app, redirect }) => {
  const currentPath = app.context.route.fullPath;
  const config = app.context.$vsf.$odoo.config.app.$config;
  const { data } = await axios.get(`${config.siteUrl}/api/redirects/${config.redirectRefreshExtension}`);

  const route = data.find(item => item.from === currentPath);

  if (route) {
    redirect(301, route.to);
  }
};

