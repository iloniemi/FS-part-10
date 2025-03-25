import { Image, StyleSheet, Text as NativeText, View, Pressable } from "react-native";
import theme from "../theme";
import { numberToText } from "../utils";
import Text from "./Text";
import * as Linking from 'expo-linking';


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
  },
  urlButton: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.textOnPrimary,
    flexGrow: 0,
    borderRadius: 3,
    padding: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: theme.fontSizes.subheading,
    marginVertical: 8,
  }
});

const RepositoryItem = ({item, showUrlButton}) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.containerTop}>
        <Image style={styles.image} source={{uri: item.ownerAvatarUrl}} />
        <View style={styles.containerText}>
          <Text testID="fullName" fontWeight="bold">{item.fullName}</Text>
          <Text testID="description" color="textSecondary">{item.description}</Text>
          <View style={styles.containerLanguages}>
            <NativeText testID="language" style={styles.language}>{item.language}</NativeText>
          </View>
        </View>
      </View>
      <View style={styles.containerStats}>
        <View>
          <Text testID="stars" fontWeight="bold" >{numberToText(item.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View>
          <Text testID="forks" fontWeight="bold" >{numberToText(item.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View>
          <Text testID="reviews" fontWeight="bold" >{numberToText(item.reviewCount)}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View>
          <Text testID="rating" fontWeight="bold" >{numberToText(item.ratingAverage)}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
        {showUrlButton && <Pressable onPress={() => Linking.openURL(item.url)} >
            <NativeText style={styles.urlButton}>
              Open in GitHub
            </NativeText>
          </Pressable>}
    </View>
  );
};

export default RepositoryItem;