import { Category, OrderLine, Product } from "@vue-storefront/odoo-api";
import { GreenOrderLine, GreenProduct } from "~/green-api/types";

const trackViewItem = (currency: string, value: number, products: IGAProduct[]) => {
  (window as any)?.dataLayer?.push({
    event: "view_item",
    ecommerce: {
      currency: currency,
      value: value,
      items: [...products],
    },
  });
};

const trackViewItemList = (itemListId: string, itemListName: string, products: IGAProduct[]) => {
  (window as any)?.dataLayer?.push({
    event: "view_item_list",
    ecommerce: {
      item_list_id: itemListId,
      item_list_name: itemListName,
      items: [...products],
    },
  });
};

const trackSelectItem = (itemListId: string, itemListName: string, products: IGAProduct[]) => {
  (window as any)?.dataLayer?.push({
    event: "select_item",
    ecommerce: {
      item_list_id: itemListId,
      item_list_name: itemListName,
      items: [...products],
    },
  });
};

const trackViewCart = (currency: string, value: number, products: IGAProduct[]) => {
  (window as any)?.dataLayer?.push({
    event: "view_cart",
    ecommerce: {
      currency: currency,
      value: value,
      items: [...products],
    },
  });
};

const trackAddToCart = (currency: string, value: number, products: IGAProduct[]) => {
  (window as any)?.dataLayer?.push({
    event: "add_to_cart",
    ecommerce: {
      currency: currency,
      value: value,
      items: [...products],
    },
  });
};

const trackRemoveFromCart = (currency: string, value: number, products: IGAProduct[]) => {
  (window as any)?.dataLayer?.push({
    event: "remove_from_cart",
    ecommerce: {
      currency: currency,
      value: value,
      items: [...products],
    },
  });
};

const trackAddPaymentInfo = (currency: string, value: number, paymentType: string, products: IGAProduct[], coupon?: string) => {
  (window as any)?.dataLayer?.push({
    event: "add_payment_info",
    ecommerce: {
      currency: currency,
      value: value,
      payment_type: paymentType,
      coupon: coupon,
      items: [...products],
    },
  });
};

const trackAddShippingInfo = (currency: string, value: number, shippingTier: string, products: IGAProduct[], coupon?: string) => {
  (window as any)?.dataLayer?.push({
    event: "add_shipping_info",
    ecommerce: {
      currency: currency,
      value: value,
      shipping_tier: shippingTier,
      coupon: coupon,
      items: [...products],
    },
  });
};

const trackBeginCheckout = (currency: string, value: number, products: IGAProduct[]) => {
  (window as any)?.dataLayer?.push({
    event: "begin_checkout",
    ecommerce: {
      currency: currency,
      value: value,
      items: [...products],
    },
  });
};

const trackPurchase = (purchaseInfo: IGAPurchaseInfo, products: IGAProduct[]) => {
  (window as any)?.dataLayer?.push({
    event: "purchase",
    ecommerce: {
      transaction_id: purchaseInfo.transaction_id,
      value: purchaseInfo.value,
      tax: purchaseInfo.tax,
      shipping: purchaseInfo.shipping,
      currency: purchaseInfo.currency,
      coupon: purchaseInfo?.coupon,
      items: [...products],
    },
  });
};

export const setTrackViewItem = (product: Product) => {
  const mappedProduct = mapProduct(product);
  const itemValue = product.hasDiscountedPrice ? product.priceAfterDiscount : product.price;

  trackViewItem(product.currency?.name, itemValue, [mappedProduct]);
};

export const setTrackViewItemList = (itemListId: string, itemListName: string, products: Product[]) => {
  const mappedProducts = products.map((product, index) => {
    return mapProduct(product, index);
  });

  mappedProducts.forEach((product) => {
    product.item_list_id = itemListId;
    product.item_list_name = itemListName;
  });

  trackViewItemList(itemListId, itemListName, mappedProducts);
};

export const setTrackSelectItem = (itemListId: string, itemListName: string, product: Product, index: number) => {
  const mappedProduct = mapProduct(product);
  mappedProduct.index = index;

  mappedProduct.item_list_id = itemListId;
  mappedProduct.item_list_name = itemListName;

  trackSelectItem(itemListId, itemListName, [mappedProduct]);
};

export const setTrackViewCart = (value: number, products: Product[], currency?: string) => {
  const mappedProducts = products.map((product, index) => {
    return mapProduct(product, index);
  });

  // Currency can be undefined apparently
  const getCurrency: string = currency ? currency : mappedProducts[0].currency;

  trackViewCart(getCurrency, value, mappedProducts);
};

export const setAddToCart = (product: Product) => {
  const mappedProduct = mapProduct(product);
  const currency = mappedProduct.currency;
  const itemValue = product.hasDiscountedPrice ? product.priceAfterDiscount : product.price;

  trackAddToCart(currency, itemValue, [mappedProduct]);
};

export const setTrackBeginCheckout = (value: number, orderLines: OrderLine[], currency?: string) => {
  const mappedProducts = orderLines
    .map((orderLine, index) => {
      const mappedOrderLine = mapOrderLine(orderLine);
      return mapProduct(mappedOrderLine, index);
    })
    .filter((product) => product != undefined);

  // Currency can be undefined apparently
  const getCurrency: string = currency ? currency : mappedProducts[0].currency;

  trackBeginCheckout(getCurrency, value, mappedProducts);
};

export const setTrackRemoveFromCart = (orderLine: GreenOrderLine) => {
  const mappedOrderLine = mapOrderLine(orderLine);
  const mappedProduct = mapProduct(mappedOrderLine);
  const getCurrency: string = mappedProduct?.currency;

  const itemValue = orderLine.product?.hasDiscountedPrice ? orderLine.product?.priceAfterDiscount : orderLine.product.price;

  trackRemoveFromCart(getCurrency, itemValue, [mappedProduct]);
};

export const setTrackAddShippingInfo = (value: number, orderLines: GreenOrderLine[], shippingTier: string, currency?: string) => {
  const mappedProducts = orderLines
    .map((orderLine, index) => {
      const mappedOrderLine = mapOrderLine(orderLine);
      return mapProduct(mappedOrderLine, index);
    })
    .filter((product) => product != undefined);

  // Currency can be undefined apparently
  const getCurrency: string = currency ? currency : mappedProducts[0].currency;

  const getShipping = shippingTier ? shippingTier : "";

  trackAddShippingInfo(getCurrency, value, getShipping, mappedProducts);
};

export const setTrackAddPaymentInfo = (value: number, orderLines: GreenOrderLine[], paymentType: string) => {
  const mappedProducts = orderLines
    .map((orderLine, index) => {
      const mappedOrderLine = mapOrderLine(orderLine);
      return mapProduct(mappedOrderLine, index);
    })
    .filter((product) => product != undefined);

  // Currency can be undefined apparently
  const getCurrency = mappedProducts[0].currency;

  trackAddPaymentInfo(getCurrency, value, paymentType, mappedProducts);
};

export const setPurchaseTracking = (purchaseInfo: IGAPurchaseInfo, orderLines: GreenOrderLine[]) => {
  const mappedProducts = orderLines
    .map((orderLine, index) => {
      const mappedOrderLine = mapOrderLine(orderLine);
      return mapProduct(mappedOrderLine, index);
    })
    .filter((product) => product != undefined);

  // Currency can be undefined apparently
  const getCurrency = mappedProducts[0].currency;

  purchaseInfo.currency = getCurrency;

  trackPurchase(purchaseInfo, mappedProducts);
};

const mapOrderLine = (orderLine: OrderLine): GreenProduct => {
  const product = { ...orderLine.product };
  product.qty = orderLine.quantity;

  return product;
};

// Maps the storeFront product to Google Analytics product
// Reference: https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_payment_info_item
const mapProduct = (product: GreenProduct, index = 0): IGAProduct => {
  const categories = product.categories ? product.categories[0] : null;
  const mappedCategories = categories ? mapCategories(categories) : {};
  let mappedProduct = {
    item_id: product.id,
    item_name: product?.name,
    affiliation: "Greenmind.dk",
    currency: product.currency?.name,
    index: index,
    ...mappedCategories,
    price: product?.price,
    discount: product.hasDiscountedPrice ? product.price - product.priceAfterDiscount : null,
    quantity: product?.qty,
    item_variant: product.combinationInfoVariant ? product.combinationInfoVariant.grade_name : null,
    item_brand: product?.manufacturerName,
  };

  if (product.googleAnalytics) {
    mappedProduct = { ...mappedProduct, ...product.googleAnalytics };
  }

  return mappedProduct;
};

const mapCategories = (category: Category) => {
  const categoriesObj = {};
  const categories = getCategories(category);

  categories.forEach((categoryName, index) => {
    if (5 > index) {
      categoriesObj[`item_category${index > 0 ? index + 1 : ""}`] = categoryName;
    }
  });

  return categoriesObj;
};

const getCategories = (category: Category, mappedCategories = []) => {
  for (const prop in category) {
    if (prop == "parent") {
      mappedCategories.unshift(category.name);

      return getCategories(category[prop], mappedCategories);
    }
  }
  return mappedCategories;
};

export interface IGAPurchaseInfo {
  transaction_id: string;
  affiliation: string;
  value: number;
  tax: number;
  shipping: number;
  currency?: string;
  coupon?: string;
}
export interface IGAProduct {
  item_id: number;
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
