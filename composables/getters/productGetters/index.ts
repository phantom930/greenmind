import { productGetters } from '@vue-storefront/odoo';
import { Product, AttributeValue } from '@vue-storefront/odoo-api';
import { CombinationInfo, GreenProduct } from '~/green-api/types';

const getAccessoryProducts = (product: GreenProduct) : Product[] => product?.accessoryProducts || [];

const getAttributesValues = (product: GreenProduct) : AttributeValue[] => product?.variantAttributeValues || [];

const getGrades = (product: GreenProduct) : CombinationInfo[] => product?.combinationInfoGrade?.grades;

const getImageFilename = (product: GreenProduct) : string => product?.imageFilename || '';

const getAttributesWithoutGrade = (product: GreenProduct) : AttributeValue[] =>
  product?.variantAttributeValues ?.filter(attribute => attribute?.attribute?.name !== 'Grade');

const getters = {
  ...productGetters,
  getAccessoryProducts,
  getAttributesWithoutGrade,
  getAttributesValues,
  getGrades,
  getImageFilename
};

export default getters;
