import { AgnosticBreadcrumb } from '@vue-storefront/core';
import { facetGetters } from '@vue-storefront/odoo';
import { GreenProduct } from '~/green-api/types';
import { Category } from '@vue-storefront/odoo-api';
import { useContext } from '@nuxtjs/composition-api';

const iterateNested = (category : Category, breadcrumbs: Array<any>) => {

  if (category?.parent) {
    breadcrumbs.push({
      text: category.name,
      link: category?.slug
    });
    iterateNested(category.parent, breadcrumbs);
  }
};

export const getBreadcrumbsByProduct = (product: GreenProduct): AgnosticBreadcrumb[] => {
  const { i18n } = useContext();

  const breadcrumbs = [];
  const category = product.categories?.find((cat) => cat.name !== 'All');

  iterateNested(category, breadcrumbs);

  breadcrumbs.push({ text: i18n.t('Home')?.toString(), link: '/' });
  breadcrumbs.reverse();

  breadcrumbs.push({
    text: `${product?.name || ''} ${product?.websiteSubtitle || ''}` || '',
    link: ''
  });
  return breadcrumbs;
};

const getBreadcrumbs = (currentCategory : Category | any) : AgnosticBreadcrumb[] => {
  const { i18n } = useContext();

  const breadcrumbs = [{ text: i18n.t('Home')?.toString(), link: '/' }];

  breadcrumbs.push({
    text: currentCategory.name,
    link: currentCategory.slug
  });

  return breadcrumbs;
};

const getters = {
  ...facetGetters,
  getBreadcrumbsByProduct,
  getBreadcrumbs
};

export default getters;
