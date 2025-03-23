import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  

  const signIn = async ({ username, password }) => {
    const result = await mutate({
      variables: {
        credentials: {
          username,
          password
        },
      },
    });

    if (result?.data?.authenticate?.accessToken) {
      await authStorage.setAccessToken(result.data.authenticate.accessToken);
      client.resetStore();
    }
    
    return result;
  };
  return [signIn, result];
};

export default useSignIn;