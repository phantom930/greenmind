module.exports = {
    greenGetProductAccessories: ({variables}) => ({
        query: `
            query ($id: Int) {
                product(id: $id) {
                    accessoryProducts {
                        id
                        name
                    }
                }
            }
        `
    })
}