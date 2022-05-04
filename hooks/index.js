const { integrations } = require('../middleware.config');
const graphqlBaseUrl = integrations.odoo.configuration.graphqlBaseUrl;

const consola = require('consola');
const chalk = require('chalk');
const axios = require('axios');
const fsExtra = require('fs-extra');
const queries = require('../helpers/buildQueries');

const headers = { headers: { 'Content-Type': 'application/json' }};

const fetchProducts = async () => {
  return await axios.post(graphqlBaseUrl, { query: `${queries.products}` }, headers);
};

const fetchCategories = async () => {
  return await axios.post(graphqlBaseUrl, { query: `${queries.categories}` }, headers);
};

const getFirstParamFromArray = (array) => {
  const slugs = array?.map(item =>item.slug.split('/'));
  const splited = slugs.map(item => `/${item[1]}`);
  return [...new Set(splited)];
};

export default {
  build: {
    async before(builder) {
      consola.info(chalk.bold('ODOO'), ' - Started fetch (product|categories) to build custom routes...');

      const { data } = await fetchProducts();
      const { data: categoriesData } = await fetchCategories();

      await fsExtra.writeJson('customRoutes/products.json', getFirstParamFromArray(data.data.products.products));
      await fsExtra.writeJson('customRoutes/categories.json', getFirstParamFromArray(categoriesData.data.categories.categories));

      consola.success(chalk.bold('ODOO'), ' - Finish build custom routes!');
    }
  }
};
