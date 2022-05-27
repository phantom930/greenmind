const { integrations } = require('../middleware.config');
const redirectUrl = `${integrations.odoo.configuration.odooBaseUrl}vsf/redirects`;
const consola = require('consola');
const chalk = require('chalk');
const axios = require('axios');

export default async (builder) => {
  consola.info(chalk.bold('ODOO'), ' - Started fetch ODOO redirects...');

  const { data } = await axios.get(redirectUrl);
  builder.nuxt.options.publicRuntimeConfig.redirects = data;

  consola.success(chalk.bold('ODOO'), ' - Redirects.json written!');
};
