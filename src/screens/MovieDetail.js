import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getMovieDetails} from '../api/tmdb';
import AIcon from 'react-native-vector-icons/AntDesign';
import TopBackButtonBar from '../constant/TopBackButtonBar';

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
      <TopBackButtonBar headingTitle={'Movie Detail'} handleBack={handleBack} />
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#FFF"
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}>
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
            <Text style={styles.itemBold}>
              {movieDetails.vote_average !== undefined
                ? movieDetails.vote_average.toFixed(1)
                : 'N/A'}
            </Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemNormal}>Country: </Text>
            <Text style={styles.itemBold}>{movieDetails.origin_country}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemNormal}>Tagline: </Text>
            <Text style={styles.itemItalic}>{movieDetails.tagline}</Text>
          </View>
          <View style={styles.itemColumn}>
            <Text style={styles.itemNormal}>Produced By: </Text>
            <Text style={styles.itemBold}>
              {movieDetails.production_companies
                ?.map(company => company.name)
                .join(', ')}
            </Text>
          </View>
          <View style={styles.itemColumn}>
            <Text style={styles.itemNormal}>Overview: </Text>
            <Text style={styles.overviewBold}>{movieDetails.overview}</Text>
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
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  poster: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  itemRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  itemColumn: {
    marginVertical: 4,
  },
  itemNormal: {
    fontSize: 16,
  },
  itemBold: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  overviewBold: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  itemItalic: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    width: '90%',
  },
});

export default MovieDetail;
