import { cartGetters } from '@vue-storefront/odoo';
import { OrderLine } from '@vue-storefront/odoo-api';
import { GreenProduct } from '~/green-api/types';

export const getCartItemTitle = (orderLine: OrderLine): string =>
  orderLine?.product.name || 'Product name';

export const getCartItemWebsiteTitle = (product: GreenProduct): string =>
  product?.websiteSubtitle || 'Subtitle';

const getters = {
  ...cartGetters,
  getCartItemTitle,
  getCartItemWebsiteTitle
};

export default getters;
