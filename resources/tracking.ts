import { Category, Product } from "@vue-storefront/odoo-api";

const trackViewItem = (currency: string, value: number, products: IGAProduct[]) => {
  (window as any).dataLayer?.push({ ecommerce: null })
  (window as any).dataLayer?.push({
    event: "view_item",
    ecommerce: {
      currency: currency,
      value: value,
      items: [...products]
    },
  });

}

export const setTrackViewItem = (product: Product) => {
  const mappedProduct = mapProduct(product);
  trackViewItem(product.currency.name, product.price, [mappedProduct]);

}

const mapProduct = (product: Product): IGAProduct => {
  return {
    item_id: product.sku,
    item_name: product.name,
    affiliation: "Greenmind.dk",
    currency: product.currency.name,
    index: 0,
    ...mapCategories(product.categories[0]),
    price: product.price,
    quantity: product.qty,
  }
}

const mapCategories = (category: Category) => {
  const categoriesObj = {}
  const categories = getCategories(category);

  categories.forEach((categoryName, index) => {
    categoriesObj[`item_category${index ? index : ''}`] = categoryName
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
