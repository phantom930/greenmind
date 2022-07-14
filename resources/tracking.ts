import { Category, Product } from "@vue-storefront/odoo-api";

const trackViewItem = (currency: string, value: number, products: IGAProduct[]) => {
  (window as any)?.dataLayer?.push({ ecommerce: null })
    (window as any)?.dataLayer?.push({
      event: "view_item",
      ecommerce: {
        currency: currency,
        value: value,
        items: [...products]
      }, 'debug_mode': true
    });
}

const trackViewItemList = (itemListId: string, itemListName: string, products: IGAProduct[]) => {
  (window as any)?.dataLayer?.push({ ecommerce: null })
    (window as any)?.dataLayer?.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: null,
        item_list_name: null,
        items: [...products]
      },
      'debug_mode': true
    });
}

export const setTrackViewItem = (product: Product) => {
  const mappedProduct = mapProduct(product);
  const itemValue = product.hasDiscountedPrice ? product.priceAfterDiscount : product.price;

  trackViewItem(product.currency.name, itemValue, [mappedProduct]);
}

export const setTrackViewItemList = (itemListId: string, itemListName: string, products: Product[]) => {
  const mappedProducts = products.map((product, index) => {
    return mapProduct(product, index)
  })

  trackViewItemList(itemListId, itemListName, mappedProducts);
}



const mapProduct = (product: Product, index = 0): IGAProduct => {
  return {
    item_id: product.sku,
    item_name: product.name,
    affiliation: "Greenmind.dk",
    currency: product.currency?.name,
    index: index,
    ...mapCategories(product.categories[0]),
    price: product.price,
    discount: product.hasDiscountedPrice ? product.price - product.priceAfterDiscount : null,
    quantity: product?.qty,
    item_variant: product.attributeValues[0].name,
  }
}

const mapCategories = (category: Category) => {
  const categoriesObj = {}
  const categories = getCategories(category);

  categories.forEach((categoryName, index) => {
    if (5 > index) {
      categoriesObj[`item_category${index ? index : ''}`] = categoryName
    }
  })

  return categoriesObj;
}

const getCategories = (category: Category, mappedCategories = []) => {

  for (const prop in category) {
    if (prop == 'parent') {
      mappedCategories.unshift(category.name)

      return getCategories(category[prop], mappedCategories);
    }
  }
  return mappedCategories;
}

export interface IGAProduct {
  item_id: string;
  item_name: string;
  affiliation?: string;
  coupon?: string;
  currency?: string;
  discount?: number;
  index?: number;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  item_list_id?: string;
  item_list_name?: string;
  item_variant?: string;
  location_id?: string;
  price?: number;
  quantity?: number;
}
