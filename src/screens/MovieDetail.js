import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import {getMovieDetails} from '../api/tmdb';
import AIcon from 'react-native-vector-icons/AntDesign';

const MovieDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {movieId} = route.params;
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});

  const handleBack = () => {
    navigation.goBack();
  };

  const fetchData = async () => {
    try {
      const results = await getMovieDetails(movieId);
      // console.log(results, 'results');
      setMovieDetails(results);
    } catch (error) {
      console.error(error, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [movieId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={handleBack}>
          <MIcons name="chevron-left" size={30} color="black" />
        </TouchableWithoutFeedback>
        <Text style={styles.headerTitle}>Movie Detail</Text>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#FFF"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
            }}
            style={styles.poster}
          />
          <Text style={styles.title}>{movieDetails.title}</Text>
          <View style={styles.itemRow}>
            <Text style={styles.itemNormal}>Release Date: </Text>
            <Text style={styles.itemBold}>{movieDetails.release_date}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemNormal}>
              Average <AIcon name="star" size={20} color="orange" />:{' '}
            </Text>
            <Text style={styles.itemBold}>{movieDetails.vote_average}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemBold}>{movieDetails.overview}</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  scrollViewContent: {
    padding: 16,
  },
  poster: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  itemRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  itemNormal: {
    fontSize: 16,
  },
  itemBold: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MovieDetail;
