import { productGetters } from '@vue-storefront/odoo';
import { Product, AttributeValue } from '@vue-storefront/odoo-api';
import { CombinationInfo, GreenProduct } from '~/green-api/types';

const getAccessoryProducts = (product: GreenProduct) : Product[] => product?.accessoryProducts || [];

const getAttributesValues = (product: GreenProduct) : AttributeValue[] => product?.variantAttributeValues || [];

const getGrades = (product: GreenProduct) : CombinationInfo[] => product?.combinationInfoGrade?.grades;

const getImageFilename = (product: GreenProduct) : string => product?.imageFilename || '';

const getAttributesWithoutGrade = (product: GreenProduct) : AttributeValue[] =>
  product?.variantAttributeValues ?.filter(attribute => attribute?.attribute?.name !== 'Grade');

const getSchemaAttributeValues = (product: GreenProduct) : AttributeValue[] => {
  const groupedByName = new Map();
  const returnArray : AttributeValue[] = [];
  product?.schemaAttributeValues?.forEach((item) => {
    if (!groupedByName.has(item.attribute.name)) {
      groupedByName.set(item.attribute.name, []);
    }
    groupedByName.get(item.attribute.name).push(item);
  });

  groupedByName?.forEach((item, index) => {
    if (item.length > 1) {
      return returnArray.push({
        attribute: {
          id: 0,
          name: String(index)
        },
        id: 0,
        search: '',
        displayType: '',
        name: item.map(child => child.name).reduce((acc, current) => acc += `, ${current}`)
      });
    }

    returnArray.push(item[0]);
  });

  return returnArray || [];
};

const getters = {
  ...productGetters,
  getSchemaAttributeValues,
  getAccessoryProducts,
  getAttributesWithoutGrade,
  getAttributesValues,
  getGrades,
  getImageFilename
};

export default getters;
