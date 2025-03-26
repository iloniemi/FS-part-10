import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Button, Menu } from 'react-native-paper';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.background,
  },
  container: {
    backgroundColor: theme.colors.background,
  },
});

const SortingMenu = ({sorting, setSorting}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const openMenu = () => setMenuIsOpen(true);
  const closeMenu = () => setMenuIsOpen(false);

  const onPress = (value) => () => {
    setSorting(value);
    setMenuIsOpen(false);
  };

  return (
    <Menu
      visible={ menuIsOpen }
      anchor={ <Button onPress={ openMenu }>{sorting}</Button> }
      onDismiss={ closeMenu }
    >
      <Menu.Item title='Latest repositories' onPress={onPress('Latest repositories')} />
      <Menu.Item title='Highest rated repositories' onPress={onPress('Highest rated repositories')} />
      <Menu.Item title='Lowest rated repositories' onPress={onPress('Lowest rated repositories')} />
    </Menu>
  );
};

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();
  
  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

  const PressableRepositoryItem = ({item}) => (
    <Pressable onPress={ () => navigate(`/repositories/${item.id}`) }>
      <RepositoryItem item={item} />
    </Pressable>
  );

  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={ PressableRepositoryItem }
        style={ styles.container }
      />
    </View>
  );
}


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [ sorting, setSorting ] = useState('Latest repositories');
  const { repositories } = useRepositories(sorting);

  return (
    <View>
      <SortingMenu sorting={sorting} setSorting={setSorting} />
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};

export default RepositoryList;