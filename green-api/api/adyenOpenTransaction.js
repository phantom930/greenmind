const gql = require('graphql-tag');

const adyenOpenTransaction = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.mutate({
    variables: params,
    mutation: gql`
    mutation($acquirerId: Int!){
      adyenTransaction(acquirerId: $acquirerId) {
        transaction
      }
    }`
  });
  return response;
};

module.exports = adyenOpenTransaction;
