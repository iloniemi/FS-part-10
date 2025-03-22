import { useApolloClient, useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const client = useApolloClient();
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  if (error) console.log('Error', error)
  
  const repositories = !loading ? data.repositories : undefined;

  //should work
  const refetch = () => client.refetchQueries({ query: GET_REPOSITORIES });

  return { repositories, loading, refetch };
};

export default useRepositories;