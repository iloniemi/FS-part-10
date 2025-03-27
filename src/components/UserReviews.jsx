import { useQuery } from "@apollo/client";
import Text from "./Text";
import { ME } from "../graphql/queries";
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

const Review = ({item}) => {
  const createdAt = format(item.createdAt, 'dd.MM.yyyy');
  return (
    <View style={styles.itemMainContainer}>
      <Text color='primary' fontWeight='bold' fontSize='heading' style={styles.rating}>{item.rating}</Text>
      <View style={styles.textContainer}>
        <Text fontWeight='bold' fontSize='heading'>{item.repository.fullName}</Text>
        <Text fontSize='heading' >{createdAt}</Text>
        <Text>{item.text}</Text>
      </View>
    </View>
  );
};


const ItemSeparator = () => <View style={styles.separator} />

const UserReviews = () => {
  const {data} = useQuery(ME, {variables: { includeReviews: true}});
  if (data === undefined) return <Text>Loading reviews</Text>

  const reviews = data.me.reviews.edges.map(edge => edge.node);
  
  return (
    <FlatList
      data={ reviews }
      keyExtractor={({ id }) => id}
      renderItem={Review}
      ItemSeparatorComponent={ItemSeparator}
    />
  );

};

export default UserReviews;