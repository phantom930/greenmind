const gql = require('graphql-tag');
const orderFragment = require('./fragments/orderFragment.ts');
const productCategoryParentChainFragment = require('./fragments/productCategoryParentChainFragment.ts');

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
      minPrice
      maxPrice
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
        googleAnalytics
        websiteSubtitle
        smallImage
        price
        manufacturerName
        name
        description
        image
        imageFilename
        slug
        sku
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
        googleAnalytics
        price
        name
        description
        image
        imageFilename
        slug
        combinationInfoVariant
        manufacturerName
      }
    }
  }
            `,
    variables
  }),
  greenGetProduct: ({variables}) => ({
    query: gql`
            query ($slug: String) {
                product(slug: $slug) {
                    id
                    name
                    image
                    isInStock
                    qty
                    imageFilename
                    description
                    smallImage
                    slug
                    googleAnalytics
                    manufacturerName
                    jsonLd
                    qty
                    sku
                    status
                    price
                    websiteSubtitle
                    combinationInfoVariant
                    combinationInfoGrade
                    productTemplate{
                      description
                      id
                    }
                    variantAttributeValues{
                      id
                      name
                      attribute {
                        name
                      }
                    }
                    schemaAttributeValues{
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
                        imageFilename
                    }
                    categories{
                        id
                        slug
                        name
                        ${productCategoryParentChainFragment}
                    }
                    alternativeProducts{
                      id
                      websiteSubtitle
                      smallImage
                      price
                      name
                      description
                      image
                      imageFilename
                      slug
                      combinationInfoVariant
                    }
                    accessoryProducts{
                        id
                        name
                        description
                        image
                        imageFilename
                        price
                        combinationInfoVariant
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
    query{
      cart{
        ${orderFragment}
      }
    }`
  }),
  greenCartLoadUpdate: ({variables}) => ({
    variables,
    query: gql`
    query{
      cart(updatePrices: true){
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
  greenCartAddMultipleItem: ({variables}) => ({
    variables,
    mutation: gql`
       mutation($products: [ProductInput]!){
        cartAddMultipleItems(products: $products){
          ${orderFragment}
        }
      }
    `
  }),
  greenCartRemoveMultipleItem: ({variables}) => ({
    variables,
    mutation: gql`
       mutation($lineIds: [Int]!){
          cartRemoveMultipleItems(lineIds: $lineIds){
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
    query: gql `
    query(
      $search: String
      $filter: CategoryFilterInput
      $currentPage: Int
      $sort: CategorySortInput
    ) {
      categories(
        search: $search
        filter: $filter
        currentPage: $currentPage
        pageSize: 400
        sort: $sort
      ) {
        categories {
          id
          name
          slug
          childs {
            id
            name
            slug
            childs {
              id
              name
              slug
            }
          }
          parent {
            id
            name
            slug
            parent {
              id
              name
              slug
              childs {
                id
                name
                slug
                childs {
                  id
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }`
  }),

  greenAddAddress: ({variables}) => ({
    variables,
    mutation: gql `
    mutation addAddress($name: String!, $city: String!, $countryId: Int!, $phone: String!, $street: String!, $street2: String, $zip: String!, $type: AddressEnum! ) {
      addAddress(type: $type, address: {name: $name, city: $city, countryId: $countryId, phone: $phone, street: $street, street2: $street2, zip: $zip}) {
        id
        name
        street
        street2
        city
        state
        {
          id
        }
        country
        {
          id
        }
        email
        phone
      }
    }`
  }),
  greenUpdateAddress: ({variables}) => ({
    variables,
    mutation: gql `
    mutation updateAddress($id: Int!, $name: String!, $city: String!, $countryId: Int!, $phone: String!, $street: String!, $street2: String, $zip: String!) {
      updateAddress( address: {id: $id,name: $name, city: $city, countryId: $countryId, phone: $phone, street: $street, street2: $street2, zip: $zip}) {
        id
        name
        street
        street2
        city
        state
        {
          id
        }
        country
        {
          id
        }
        email
        phone
      }
    }`
  }),
  greenNullShippingMethod: ({variables}) => ({
    variables,
    mutation: gql `
    mutation{
      setShippingMethod{
        order{
          id
          name
          shippingMethod{
            id
            name
            price
          }
        }
      }
    }`
  }),
  greenConfirmationPayment: ({variables}) => ({
    variables,
    query: gql `
    query {
      paymentConfirmation{
        ${orderFragment}
      }
    }`
  })
};
