import { useApolloClient, useQuery } from "@apollo/client";
import Text from "./Text";
import { ME } from "../graphql/queries";
import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import theme from "../theme";
import { format } from "date-fns";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

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
  buttonContrainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.backgroundOnBackground,
    gap: 8,
    justifyContent: 'space-around',
    alignContent: 'stretch'
  },
  button: {
    borderRadius: 3,
    padding: 8,
    marginVertical: 8,
    color: theme.colors.textOnPrimary,
    flexGrow: 1,
  },
  repoButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
});

const Review = ({item, navigate, createDeleteHandler}) => {
  const createdAt = format(item.createdAt, 'dd.MM.yyyy');
  return (
    <View>
    <View style={styles.itemMainContainer}>
      <Text color='primary' fontWeight='bold' fontSize='heading' style={styles.rating}>{item.rating}</Text>
      <View style={styles.textContainer}>
        <Text fontWeight='bold' fontSize='heading'>{item.repository.fullName}</Text>
        <Text fontSize='heading' >{createdAt}</Text>
        <Text>{item.text}</Text>
      </View>
    </View>
      <View style={styles.buttonContrainer}>
        <Pressable onPress={() => navigate(`/repositories/${item.repository.id}`)}>
          <Text fontSize='heading' fontWeight='bold' style={[styles.button, styles.repoButton]} >
            View repository
          </Text>
        </Pressable>
        <Pressable onPress={() => verifyDelete(createDeleteHandler(item.id))}>
          <Text fontSize='heading' fontWeight='bold' style={[styles.button, styles.deleteButton]} >
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const verifyDelete = (handleDelete) => {
  Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
    {
      text: 'Cancel',
      //onPress: () => {},
      style: 'cancel',
    },
    {text: 'DELETE', onPress:
      handleDelete,
    },
  ])};

const ItemSeparator = () => <View style={styles.separator} />

const UserReviews = () => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();
  const apolloclient = useApolloClient();

  const {data} = useQuery(ME, { fetchPolicy: 'cache-and-network', variables: { includeReviews: true}});
  if (data === undefined) return <Text>Loading reviews</Text>
  const reviews = data.me.reviews.edges.map(edge => edge.node);

  const createDeleteHandler = (id) => async () => {
    await deleteReview(id);
    await apolloclient.refetchQueries({
      include: [ME],
    });
  }
  
  return (
      <FlatList
        data={ reviews }
        keyExtractor={({ id }) => id}
        renderItem={({item}) => <Review item={item} navigate={navigate} createDeleteHandler={createDeleteHandler} />}
        ItemSeparatorComponent={ItemSeparator}
      />
  );

};

export default UserReviews;