import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';
import AuthStorage from './src/utils/AuthStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import { PaperProvider } from 'react-native-paper';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);


const App = () => {
  //console.log('extra variables', Constants.expoConfig.extra);

  return (
    <>
      <NativeRouter future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
      }}>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <PaperProvider>
              <Main />
            </PaperProvider>
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>  );
};

export default App;