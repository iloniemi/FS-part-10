import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import AuthStorage from '../utils/AuthStorage';
import useAuthStorage from '../hooks/useAuthStorage';
import Text from './Text';
import { useNavigate } from 'react-router-native';

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
    gap: 20,
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignContent: 'space-between',
  }
});


const AppBar = () => {
  const {data} = useQuery(ME);
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await client.resetStore();
    navigate('/');
  }
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab style={styles.tab} target='/'>Repositories</AppBarTab>
        {
          data && data.me 
          ? <>
            <AppBarTab style={styles.tab} target='/create-review'>Create a review</AppBarTab>
            <AppBarTab style={styles.tab} target='/myreviews'>My reviews</AppBarTab>
            <Pressable onPress={signOut} >
              <Text style={styles.tab}>Sign out</Text>
            </Pressable>
          </>
          : <>
            <AppBarTab style={styles.tab} target='/signin'>Sign in</AppBarTab>
            <AppBarTab style={styles.tab} target='/signup'>Sign up</AppBarTab>
          </>
        }
      </ScrollView>
    </View>
  );

};

export default AppBar;