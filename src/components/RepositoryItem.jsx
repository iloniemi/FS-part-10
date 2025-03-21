import { Image, StyleSheet, Text as NativeText, View } from "react-native";
import theme from "../theme";
import { numberToText } from "../utils";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: theme.colors.backgroundOnBackground,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 3,
  },
  containerTop: {
    flexDirection: 'row',
    padding: 8,
    gap: 8,
  },
  containerText: {
    gap: 8,
  },

  containerLanguages: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.textOnPrimary,
    flexGrow: 0,
    borderRadius: 3,
    padding: 4,
  },
  containerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});

const RepositoryItem = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Image style={styles.image} source={{uri: item.ownerAvatarUrl}} />
        <View style={styles.containerText}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <View style={styles.containerLanguages}>
            <NativeText style={styles.language}>{item.language}</NativeText>
          </View>
        </View>
      </View>
      <View style={styles.containerStats}>
        <View>
          <Text fontWeight="bold" >{numberToText(item.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View>
          <Text fontWeight="bold" >{numberToText(item.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View>
          <Text fontWeight="bold" >{numberToText(item.reviewCount)}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View>
          <Text fontWeight="bold" >{numberToText(item.ratingAverage)}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;