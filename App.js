import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';


const apolloClient = createApolloClient();
const App = () => {
console.log('extra variables', Constants.expoConfig.extra);


  return (
    <>
      <NativeRouter future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
      }}>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>  );
};

export default App;