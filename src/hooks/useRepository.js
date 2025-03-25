import { useApolloClient, useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const client = useApolloClient();
  const { data, loading, error} = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      "repositoryId": id,
    },
  });
  if (error) console.log('Error', error);

  const repository = !loading ? data.repository : undefined;

  const refetch = client.refetchQueries([{ query: GET_REPOSITORY }]);
  return { repository, loading, refetch };
};

export default useRepository;