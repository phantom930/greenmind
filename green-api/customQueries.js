const gql = require('graphql-tag');
const orderFragment = require('./fragments/orderFragment.ts');

module.exports = {
  greenGetProductList: ({variables}) => ({
    query: gql`
    query(
    $filter: ProductFilterInput
    $currentPage: Int
    $pageSize: Int = 0
    $search: String
    $sort: ProductSortInput
  ) {
    products(
      filter: $filter
      currentPage: $currentPage
      pageSize: $pageSize
      search: $search
      sort: $sort
    ) {
      totalCount
      attributeValues {
        id
        name
        displayType
        name
        htmlColor
        search
        attribute{
          id
          name
        }
      }
      products {
        id
        firstVariant
        websiteSubtitle
        smallImage
        price
        name
        description
        image
        slug
        sku
        isInWishlist
        status
        combinationInfoVariant
        categories {
            id
            name
            slug
            parent{
            parent{
                id
            }
            }
        }
        attributeValues {
            id
            name
            displayType
            priceExtra
            attribute{
              name
            }
            search
        }
      }
    }
  }`,
    variables
  }),
  greenGetProductListFormHomePage: ({variables}) => ({
    query: gql`
    query(
    $filter: ProductFilterInput
    $currentPage: Int
    $pageSize: Int = 0
    $search: String
    $sort: ProductSortInput
  ) {
    products(
      filter: $filter
      currentPage: $currentPage
      pageSize: $pageSize
      search: $search
      sort: $sort
    ) {
      products {
        id
        websiteSubtitle
        smallImage
        price
        name
        description
        image
        slug
        combinationInfoVariant
      }
    }
  }
            `,
    variables
  }),
  greenGetProduct: ({variables}) => ({
    query: gql`
            query ($id: Int) {
                product(id: $id) {
                    id
                    name
                    image
                    description
                    smallImage
                    slug
                    qty
                    typeId
                    sku
                    status
                    price
                    websiteSubtitle
                    isInWishlist
                    firstVariant
                    combinationInfoVariant
                    productTemplate{
                      id
                    }
                    variantAttributeValues{
                      id
                      name
                      attribute {
                        name
                      }
                    }
                    currency {
                        id
                        name
                        symbol
                    }
                    mediaGallery {
                        id
                        name
                        image
                    }
                    categories{
                        id
                        slug
                        name
                    }
                    alternativeProducts{
                      id
                      name
                      websiteSubtitle
                      price
                    }
                    accessoryProducts{
                        id
                        name
                        description
                        image
                        price
                    }
                    attributeValues {
                        id
                        name
                        displayType
                        priceExtra
                        attribute{
                          name
                        }
                        search
                    }
                }
            }
        `,
    variables
  }),
  greenCartLoad: ({variables}) => ({
    variables,
    query: gql`
    query {
      cart {
        ${orderFragment}
      }
    }`
  }),
  greenCartAddItem: ({variables}) => ({
    variables,
    mutation: gql`
      mutation($productId: Int!, $quantity: Int!) {
        cartAddItem(productId: $productId, quantity: $quantity) {
          ${orderFragment}
        }
      }
    `
  }),
  greenCartRemoveItem: ({variables}) => ({
    variables,
    mutation: `
      mutation($lineId: Int!){
        cartRemoveItem(lineId: $lineId){
          ${orderFragment}
        }
      }
      `
  }),
  greenCartUpdateItemQty: ({ variables}) => ({
    variables,
    mutation: `
      mutation($lineId: Int!, $quantity: Int!) {
        cartUpdateItem(lineId: $lineId, quantity: $quantity) {
          ${orderFragment}
        }
      }
      `
  }),
  greenGetCategories: ({variables}) => ({
    variables,
    query: gql `query(
      $search: String
      $filter: CategoryFilterInput
      $currentPage: Int
      $pageSize: Int
      $sort: CategorySortInput
    ) {
      categories(
        search: $search
        filter: $filter
        currentPage: $currentPage
        pageSize: $pageSize
        sort: $sort
      ) {
        categories {
          id
          name
          slug
          parent {
            id
            name
          }
        }
      }
    }`
  })
};
