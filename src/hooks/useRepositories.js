import { useApolloClient, useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sortingMethod, searchKeyword='') => {
  const client = useApolloClient();
  const variables = {};
  switch (sortingMethod) {
    case 'Latest repositories':
      variables.orderBy = 'CREATED_AT';
      break;
    case 'Highest rated repositories':
      variables.orderBy = 'RATING_AVERAGE';
      break;
    case 'Lowest rated repositories':
      variables.orderBy = 'RATING_AVERAGE';
      variables.orderDirection = 'ASC';
      break;          
    default:
      break;
  }
  if (searchKeyword !== '') variables.searchKeyword = searchKeyword;


  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
  });
  if (error) console.log('Error', error)
  
  
  const repositories = !loading ? data.repositories : undefined;

  //should work
  const refetch = () => client.refetchQueries([{ query: GET_REPOSITORIES }]);

  return { repositories, loading, refetch };
};

export default useRepositories;