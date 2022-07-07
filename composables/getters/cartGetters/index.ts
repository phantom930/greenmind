import { cartGetters } from '@vue-storefront/odoo';
import { GreenOrderLine, GreenCart } from '~/green-api/types';

export const getItemTitle = (orderLine: GreenOrderLine): string =>
  orderLine?.product?.name || 'Product name';

export const getItemImageFilename = (orderLine: GreenOrderLine): string =>
  orderLine?.product?.imageFilename || 'Product filename';

export const getItemWebsiteTitle = (orderLine: GreenOrderLine): string =>
  orderLine?.product?.websiteSubtitle || null;

export const getStandGradeName = (orderLine: GreenOrderLine): string => {
  return orderLine?.product?.combinationInfoVariant?.grade_name || '';
};

export const getItems = (cart: GreenCart): GreenOrderLine[] => cart?.order?.websiteOrderLine;

export const getDiscountPrice = (orderLine: GreenOrderLine): string => `${String(orderLine.priceTotal)?.replace('-', '')} Discount`;

export const getTotalItems = (cart: GreenCart): number => cart?.order?.totalCount || 0;

export const getAccessories = (cart: GreenCart): GreenOrderLine[] => cart?.order?.accessoryLines;

export const accessoryIsInCart = (cart: GreenCart, acessoryId: number): boolean => {
  return cart?.order?.accessoryLines?.some(item => item.product?.id === acessoryId);
};

export const getPrice = (cart: GreenCart, orderLine: GreenOrderLine): number => {
  let totalAccessoryValue = 0;
  orderLine.product?.accessoryProducts?.forEach(accessory => {
    if (accessoryIsInCart(cart, accessory.id)) {
      totalAccessoryValue += accessory.price;
    }
  });

  return totalAccessoryValue + orderLine.product?.combinationInfoVariant?.price;
};

const getters = {
  ...cartGetters,
  getItemTitle,
  getItemWebsiteTitle,
  getItems,
  getTotalItems,
  getAccessories,
  getPrice,
  accessoryIsInCart,
  getItemImageFilename,
  getStandGradeName,
  getDiscountPrice
};

export default getters;
