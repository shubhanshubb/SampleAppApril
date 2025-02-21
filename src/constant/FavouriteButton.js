import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const FavouriteButton = () => {
  const navigation = useNavigation();

  const hanldePage = () => {
    navigation.navigate('Favourite');
  };
  return (
    <TouchableOpacity
      style={styles.favouriteButton}
      onPress={() => hanldePage()}>
      <MIcons name="favorite" size={30} color="black" />
      <Text style={styles.favourite}>Favourite</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favouriteButton: {
    alignItems: 'center',
  },
  favourite: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default FavouriteButton;
