import {TextInput, StyleSheet} from 'react-native';
import React from 'react';

const SearchInput = ({search,placeholder, handleSearch}) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.searchInput}
      value={search}
      onChangeText={handleSearch}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default SearchInput;
