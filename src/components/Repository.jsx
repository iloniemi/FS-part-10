import { useParams } from "react-router-native";
import Text from "./Text";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";

const Repository = () => {
  const id = useParams().id;
  const { repository, loading } = useRepository(id);

  if (loading) return <Text>Loading repository</Text>

  
  return (
    <RepositoryItem item={repository} showUrlButton />
  );
};

export default Repository;