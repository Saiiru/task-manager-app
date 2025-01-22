import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { parseCookies } from "nookies";

const httpLink = createHttpLink({
  uri: "http://localhost:8080/graphql",
});

const authLink = setContext((_, { headers }) => {
  const cookies = parseCookies();
  const token = cookies.token;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
