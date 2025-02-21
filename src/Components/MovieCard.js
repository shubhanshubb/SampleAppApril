import {View, Text, Image, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import AIcon from 'react-native-vector-icons/AntDesign';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import {useAuthData} from '../../UserContext';
import { useNavigation } from '@react-navigation/native';

const MovieCard = ({item}) => {
  const {setFavourites, favourites} = useAuthData();
  const navigation = useNavigation();

  const isFavourite = favourites?.some(fav => fav.id === item.id);

  const handleFavourite = (item) => {
    if (isFavourite) {
      setFavourites(prevFavourites => prevFavourites.filter(fav => fav.id !== item.id));
    } else {
      setFavourites(prevFavourites => [...prevFavourites, item]);
    }
  };

  const handleMoview = (item) => {
    // console.log(item, 'item');
    navigation.navigate('MovieDetail', {movieId: item?.id});
  }

  return (
    <Pressable style={styles.movieItem} onPress={() =>handleMoview(item)}>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
        style={styles.poster}
      />
      <View style={styles.movieDetails}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.date}>
          <AIcon name="calendar" size={16} color="#000" /> Release:{' '}
          {item.release_date}
        </Text>
        <Text style={styles.rating}>
          <AIcon name="star" size={20} color="orange" /> Rating:{' '}
          {item.vote_average}
        </Text>
        <TouchableOpacity style={styles.favouriteButton} onPress={() => handleFavourite(item)}>
          <MIcons name={isFavourite ? "favorite" : "favorite-border"} size={30} color={isFavourite ? "black" : "red"} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    flexDirection: 'row',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  movieDetails: {
    marginLeft: 10,
    marginTop: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 200,
  },
  date: {
    fontSize: 16,
    marginTop: 5,
  },
  rating: {
    fontSize: 16,
    marginTop: 5,
  },
  favouriteButton: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
});

export default MovieCard;