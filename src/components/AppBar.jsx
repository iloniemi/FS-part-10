import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundAppBar,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'space-between',
  },
  tab: {
    color: theme.colors.textOnBackground,
    fontSize: theme.fontSizes.heading,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab style={styles.tab}>Repositories</AppBarTab>
    </View>
  );

};

export default AppBar;