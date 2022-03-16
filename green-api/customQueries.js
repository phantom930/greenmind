const gql = require('graphql-tag');

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
                        currency {
                            id
                            name
                            symbol
                        }
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
        order {
          id
          name
          amountTotal
          amountTax
          amountDelivery
          dateOrder
          orderUrl
          stage
          websiteOrderLine {
            id
            name
            product {
              id
              name
              image
              image
              displayName
              websiteSubtitle
            }
            quantity
            priceTotal
          }
          orderLines {
            id
            name
            product {
              id
              name
              image
              image
              displayName
              websiteSubtitle
            }
            quantity
            priceTotal
          }
          partnerInvoice {
            id
            name
            street
            city
            phone
            zip
            country {
              id
            }
            state {
              id
            }
          }
          partnerShipping {
            id
            name
            street
            city
            phone
            zip
            country {
              id
            }
            state {
              id
            }
          }
        }
      }
    }`
  })
};
