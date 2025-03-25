import { useParams } from "react-router-native";
import Text from "./Text";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import { FlatList, StyleSheet, View } from "react-native";
import theme from "../theme";
import { format } from "date-fns";


const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
  itemMainContainer: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: theme.colors.backgroundOnBackground,
    padding: 8,
  },
  textContainer: {
    gap: 8,
    flexShrink: 1,

  },
  rating: {
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 64,
    width: 64,
    borderRadius: 32,
    borderWidth: 3,
    margin: 8,
    borderColor: theme.colors.primary,
  },
});

const ItemSeparator = () => <View style={styles.separator} />

const ReviewItem = ({item}) => {
  const createdAt = format(item.createdAt, 'dd.MM.yyyy');

  return (
    <View style={styles.itemMainContainer}>
      <Text color='primary' fontWeight='bold' fontSize='heading' style={styles.rating}>{item.rating}</Text>
      <View style={styles.textContainer}>
        <Text fontWeight='bold'>{item.user.username}</Text>
        <Text>{createdAt}</Text>
        <Text>{item.text}</Text>
      </View>
    </View>
  );
}

const HeaderComponent = ({item}) => {
  return (
    <View>
      <RepositoryItem item={item} showUrlButton />
      <ItemSeparator />
    </View>
  );
};

const Repository = () => {
  const id = useParams().id;
  const { repository, loading } = useRepository(id);

  if (loading) return <Text>Loading repository</Text>
  const reviews = repository.reviews.edges.map( edge => edge.node );
  
  return (
    <FlatList
      ListHeaderComponent={<HeaderComponent item={repository} />}
      data={ reviews }
      keyExtractor={({ id }) => id}
      renderItem={ReviewItem}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default Repository;