const gql = require('graphql-tag');

const getStock = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.query({
    variables: params,
    query: gql`
    query ($productId: Int) {
      stores (productId: $productId) {
        stores {
          name
          address {
            image
            email
            phone
            street
            street2
            zip
          }
          isInStock
          openHours {
            dayOfWeek
            openHours
          }
        }
        totalCount
      }
    }`
  });
  return response;
};

module.exports = getStock;
