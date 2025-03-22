import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';

const uri = Constants.expoConfig.extra.graphqlUri;

const createApolloClient = () => {
  console.log('Apollo using uri ', uri);
  
  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;