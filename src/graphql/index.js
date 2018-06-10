import ApolloClient from "apollo-boost";
import gqlTag from "graphql-tag";

export const client = new ApolloClient()
export const gql = gqlTag;