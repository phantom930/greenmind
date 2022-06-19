const gql = require('graphql-tag');

const createUpdatePartner = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.mutate({
    variables: params,
    mutation: gql`
      mutation ($subscribeNewsletter: Boolean!, $email: String!, $name: String!, $companyName: String, $vat: String) {
        createUpdatePartner(name: $name, email: $email, subscribeNewsletter: $subscribeNewsletter, companyName: $companyName, vat: $vat) {
            id
            name
            email
        }
      }`
  });
  return response;
};

module.exports = createUpdatePartner;
