import { AgnosticBreadcrumb } from '@vue-storefront/core';
import { facetGetters } from '@vue-storefront/odoo';
import { GreenProduct } from '~/green-api/types';

export const getBreadcrumbsByProduct = (product: GreenProduct): AgnosticBreadcrumb[] => {
  const breadcrumbs = [{ text: 'Home', link: '/' }];
  const category = product.categories?.find((cat) => cat.name !== 'All');

  breadcrumbs.push({
    text: category?.name || '',
    link: category?.slug || ''
  });

  return breadcrumbs;
};

const getters = {
  ...facetGetters,
  getBreadcrumbsByProduct
};

export default getters;
