const gql = require('graphql-tag');

const adyenAcquirerInfo = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.mutate({
    variables: params,
    mutation: gql`
    mutation($acquirerId: Int!){
      adyenAcquirerInfo(acquirerId: $acquirerId){
        adyenAcquirerInfo
      }
    }`
  });
  return response;
};

module.exports = adyenAcquirerInfo;
