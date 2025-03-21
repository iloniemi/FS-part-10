import { Text, StyleSheet, View, Platform } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import { Navigate, Route, Routes } from 'react-router-native';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.background,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/">
          <Route index element={<RepositoryList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </View>
  );
};

export default Main;