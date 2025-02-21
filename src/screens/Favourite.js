import {
    View,
    FlatList,
    StyleSheet,
  } from 'react-native';
  import React from 'react';
  import {useAuthData} from '../../UserContext';
  import TopBackButtonBar from '../constant/TopBackButtonBar';
  import {useNavigation} from '@react-navigation/native';
  import MovieCard from '../Components/MovieCard';
  
  const Favourite = () => {
    const {favourites} = useAuthData();
    const navigation = useNavigation();
  
    const handleBack = () => {
      navigation.goBack();
    };
  
    return (
      <View style={styles.container}>
        <TopBackButtonBar
          headingTitle="Favourite"
          handleBack={handleBack}
        />
        <FlatList
          style={{paddingHorizontal: 20}}
          data={favourites}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({item}) => <MovieCard item={item} />}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#a6662e',
    },
  });
  
  export default Favourite;