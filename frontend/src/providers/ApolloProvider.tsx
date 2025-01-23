import { ApolloProvider as Provider } from '@apollo/client';
import { getApolloClient } from '@/infrastructure/graphql/apollo-client';

const client = getApolloClient();

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider client={client}>{children}</Provider>;
};
