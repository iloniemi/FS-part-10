import { FlatList, View, StyleSheet, Pressable, ScrollView } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import React, { useState } from 'react';
import { Button, Menu, Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';


const styles = StyleSheet.create({
  separator: {
    height: 20,
    backgroundColor: theme.colors.background,
  },
  container: {
    backgroundColor: theme.colors.background,
  },
  headerComponent: {
    padding: 16,
    gap: 8,
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


export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { searchKeyword, setSearchKeyword, sorting, setSorting } = this.props;
    
    
    return (
      <View style={styles.headerComponent}>
        <Searchbar
          value={searchKeyword} onChangeText={setSearchKeyword}
          theme={{ colors: { elevation: { level3: theme.colors.backgroundOnBackground } } }}
          style={styles.searchBar}
          />
        <SortingMenu sorting={sorting} setSorting={setSorting} />
      </View>
    );
  }
  
  PressableRepositoryItem = ({item}) => {
    const {navigate} = this.props;
    return <Pressable onPress={ () => navigate(`/repositories/${item.id}`) }>
      <RepositoryItem item={item} />
    </Pressable>
  };
  
  render() {
    const { repositories } = this.props;
    const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

    return (
      <FlatList
        ListHeaderComponent={ this.renderHeader }
        data={ repositoryNodes }
        ItemSeparatorComponent={ ItemSeparator }
        renderItem={ this.PressableRepositoryItem }
        style={styles.container}
        scrollEnabled={true}
        ListFooterComponent={ ItemSeparator }
      />
    );
  };
};


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [ sorting, setSorting ] = useState('Latest repositories');
  const [ searchKeyword, setSearchKeyword] = useState('');
  const [ debouncedKeyword ] = useDebounce(searchKeyword, 500);
  const { repositories } = useRepositories(sorting, debouncedKeyword);
  
  const navigate = useNavigate();


  return (
      <RepositoryListContainer
        repositories={repositories}
        searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}
        sorting={sorting} setSorting={setSorting}
        navigate={navigate}
      />
  );
};

export default RepositoryList;