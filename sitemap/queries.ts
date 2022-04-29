const products = `
    query {
        products (pageSize: 500){
            totalCount
            products {
                slug
            }
        }
    }
`;

export { products };
