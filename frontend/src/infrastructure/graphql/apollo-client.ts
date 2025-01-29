import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const httpLink = createHttpLink({
  uri:
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1/graphql",
  credentials: "include",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();

  return {
    headers: {
      ...headers,
      authorization: session?.accessToken
        ? `Bearer ${session.accessToken}`
        : "",
    },
  };
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
    query: {
      fetchPolicy: "network-only",
    },
  },
});

export const useApollo = (initialState) => {
  const store = client;
  return store;
};
