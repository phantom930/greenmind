const products = `
query {
  products(pageSize: 500) {
    totalCount
    products {
      slug
    }
  }
}

`;

const categories = `
query {
  categories(pageSize:300){
    categories{
      slug
    }
  }
}

`;

export { products, categories };
