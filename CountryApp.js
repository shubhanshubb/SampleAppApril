import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const CountryApp = () => {
  const [countryData, setCountryData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      'https://thunderbolt-api.delhivery.com/public/v1/countries',
    );
    // console.log(response?.data?.data?.countries);
    setCountryData(response?.data?.data?.countries);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelect = item => {
    console.log(item, 'c');
    // if (item === selectedCountry) {
    //   setSelectedCountry(null);
    // }
    setSelectedCountry([...selectedCountry, item]);
    // const isSelected = selectedCountry.some(
    //   (country) => country.country_name === item.country_name,
    // );
    // if(isSelected) {
    //   setSelectedCountry(prev =>
    //     prev.filter(country => country.country_name !== item?.country_name),
    //   )
    // } else {
    // }
    // setSelectedCountry(...prev => [...prev, item])
    // setSelectedCountry(...prev => [...prev, item]);
    console.log(selectedCountry, 'd');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {countryData?.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelect(item.country_name)}
            style={
              selectedCountry.includes(item.country_name)
                ? styles.selectedCard
                : styles.card
            }>
            <Text style={styles.countryName}>{item.country_name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
    backgroundColor: '#fff',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  selectedCard: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    backgroundColor: 'red',
  },
  countryName: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CountryApp;
