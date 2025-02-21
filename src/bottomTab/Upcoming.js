import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getUpcomingMovies} from '../api/tmdb';
import MovieCard from '../Components/MovieCard';
import FavouriteButton from '../constant/FavouriteButton';
import SearchInput from '../constant/SearchInput';
import {useIsFocused} from '@react-navigation/native';

const Upcoming = () => {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [moreLoading, setMoreLoading] = useState(false);

  const fetchData = async () => {
    try {
      const results = await getUpcomingMovies(page);
      setData(prevData => [...prevData, ...results]);
      setFilteredData(prevData => [...prevData, ...results]);
      // console.log(results, 'results');
    } catch (error) {
      console.error(error, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      setLoading(true);
      fetchData();
    }, [isFocused]);
  
    useEffect(() => {
      if (moreLoading) {
        fetchData();
        setMoreLoading(false);
      }
    }, [page]);
  
    const loadMoreList = () => {
      if (!search) {
        setMoreLoading(true);
        setPage(prevPage => prevPage + 1);
      }
    };
  
    const handleSearch = text => {
      setSearch(text);
      if (text && typeof text === 'string') {
        const filtered = data.filter(item =>
          item.title?.toLowerCase().includes(text.toLowerCase()),
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchInput
          search={search}
          placeholder="Search Popular Movies"
          handleSearch={handleSearch}
        />
        <FavouriteButton />
      </View>
      {loading && !search ? (
        <ActivityIndicator
          size="large"
          color="#FFF"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <FlatList
          data={filteredData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReached={loadMoreList}
          renderItem={({item}) => <MovieCard item={item} />}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            moreLoading && !search ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#ff9900',
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default Upcoming;
