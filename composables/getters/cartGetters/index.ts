import { cartGetters } from '@vue-storefront/odoo';
import { GreenOrderLine } from '~/green-api/types';

export const getCartItemTitle = (orderLine: GreenOrderLine): string =>
  orderLine?.product.name || 'Product name';

export const getCartItemWebsiteTitle = (product: GreenOrderLine): string =>
  product?.product?.websiteSubtitle || 'Subtitle';

const getters = {
  ...cartGetters,
  getCartItemTitle,
  getCartItemWebsiteTitle
};

export default getters;
