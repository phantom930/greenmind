const gql = require('graphql-tag');

module.exports = {
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
                    isInWishlist
                    firstVariant
                    productTemplate{
                      id
                    }
                    variantAttributeValues{
                      id
                      name
                      attributeName
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
                        attributeName
                        search
                    }
                }
            }
        `,
    variables
  })
};
