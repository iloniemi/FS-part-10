import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundAppBar,
    width: '100%',
  },
  tab: {
    color: theme.colors.textOnBackground,
    fontSize: theme.fontSizes.heading,
  },
  scrollView: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignContent: 'space-between',
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab style={styles.tab} target='/'>Repositories</AppBarTab>
        <AppBarTab style={styles.tab} target='/signin'>Sign in</AppBarTab>
      </ScrollView>
    </View>
  );

};

export default AppBar;