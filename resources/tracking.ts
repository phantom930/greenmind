import { Category, Product } from "@vue-storefront/odoo-api";

const trackViewItem = (currency: string, value: number, products: IGAProduct[]) => {
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
    (window as any)?.dataLayer?.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: itemListId,
        item_list_name: itemListName,
        items: [...products]
      },
      'debug_mode': true
    });
}

const trackSelectItem = (itemListId: string, itemListName: string, products: IGAProduct[]) => {
    (window as any)?.dataLayer?.push({
      event: "select_item",
      ecommerce: {
        item_list_id: itemListId,
        item_list_name: itemListName,
        items: [...products]
      },
      'debug_mode': true
    });
}

const trackViewCart = (currency: string, value: number, products: IGAProduct[]) => {
    (window as any)?.dataLayer?.push({
      event: "view_cart",
      ecommerce: {
        currency: currency,
        value: value,
        items: [...products]
      },
      'debug_mode': true
    });
}

const trackAddToCart = (currency: string, value: number, products: IGAProduct[]) => {
    (window as any)?.dataLayer?.push({
      event: "add_to_cart",
      ecommerce: {
        currency: currency,
        value: value,
        items: [...products]
      },
      'debug_mode': true
    });
}


export const setTrackViewItem = (product: Product) => {
  const mappedProduct = mapProduct(product);
  const itemValue = product.hasDiscountedPrice ? product.priceAfterDiscount : product.price;
  trackViewItem(product.currency?.name, itemValue, [mappedProduct]);
}

export const setTrackViewItemList = (itemListId: string, itemListName: string, products: Product[]) => {
  const mappedProducts = products.map((product, index) => {
    return mapProduct(product, index)
  })

  trackViewItemList(itemListId, itemListName, mappedProducts);
}

export const setTrackSelectItem = (itemListId: string, itemListName: string, product: Product, index: number) => {
  const mappedProduct = mapProduct(product);
  mappedProduct.index = index;
  trackSelectItem(itemListId, itemListName, [mappedProduct]);
}

// TODO fix when product data is added
export const setTrackViewCart = (currency: string, value: number, products: Product[]) => {
  const mappedProducts = products.map((product, index) => {
    return mapProduct(product, index)
  });

  // Currency can be undefined apparently
  const getCurrency: string = currency ? currency : mappedProducts[0].currency;

  // trackViewCart(getCurrency, value, mappedProducts);
}


export const setAddToCart = (product: Product ) => {
  const mappedProduct = mapProduct(product);
  const currency = mappedProduct.currency;
  const itemValue = product.hasDiscountedPrice ? product.priceAfterDiscount : product.price;

  trackAddToCart(currency, itemValue, [mappedProduct]);
}

const mapProduct = (product: Product, index = 0): IGAProduct => {
  const categories = product.categories ? product.categories[0] : null;
  const mappedCategories  = categories ? mapCategories(categories) : { };
  return {
    item_id: product?.sku,
    item_name: product?.name,
    affiliation: "Greenmind.dk",
    currency: product.currency?.name,
    index: index,
    ...mappedCategories,
    price: product?.price,
    discount: product.hasDiscountedPrice ? product.price - product.priceAfterDiscount : null,
    quantity: product?.qty,
    // @ts-ignore
    item_variant: product.variantAttributeValues! ? product.variantAttributeValues![0].name : null,
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
