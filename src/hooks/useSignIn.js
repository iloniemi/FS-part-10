import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  

  const signIn = async ({ username, password }) => {
    return await mutate({
      variables: {
        credentials: {
          username,
          password
        },
      },
    });
  };
  return [signIn, result];
};

export default useSignIn;