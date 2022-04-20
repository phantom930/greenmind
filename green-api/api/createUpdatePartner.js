const gql = require('graphql-tag');

const createUpdatePartner = async (context, params) => {
  const apolloClient = context.client.apollo;
  const response = await apolloClient.mutate({
    variables: params,
    mutation: gql`
           mutation ($countryId: Int!, $email: String!, $name: String!, $phone: String!) {
                createUpdatePartner(name: $name, email: $email, phone: $phone, countryId: $countryId) {
                    id
                    name
                    email
                    phone
                }
            }

        `
  });
  return response;
};

module.exports = createUpdatePartner;
