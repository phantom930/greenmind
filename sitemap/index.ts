const { integrations } = require('../middleware.config');

const graphqlBaseUrl = integrations.odoo.configuration.graphqlBaseUrl;
const consola = require('consola');
const chalk = require('chalk');

const axios = require('axios');
const queries = require('./queries');
const headers = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const fetchProducts = async () => {
  return await axios.post(graphqlBaseUrl, { query: `${queries.products}` }, headers);
};

const getAppRoutes = async () : Promise<void> => {
  consola.info(chalk.bold('ODOO'), ' - Started fetch sitemap dinamic routes...');
  const { data } = await fetchProducts();

  consola.success(chalk.bold('ODOO'), ' - Finished fetch sitemap dinamic routes from odoo!');
  consola.info(data.data.products.products);
};

export default getAppRoutes;
