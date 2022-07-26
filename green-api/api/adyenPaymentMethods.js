const gql = require('graphql-tag');

const adyenPaymentMethods = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.mutate({
    variables: params,
    mutation: gql`
    mutation($acquirerId: Int!){
      adyenPaymentMethods(acquirerId: $acquirerId){
        adyenPaymentMethods
      }
    }`
  });
  return response;
};

module.exports = adyenPaymentMethods;
