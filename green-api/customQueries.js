module.exports = {
    greenGetProductAccessories: ({variables}) => ({
        query: `
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
                }
            }
        `,
        variables
    })
}