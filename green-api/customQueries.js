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
                    }
                }
            }
        `
    })
}