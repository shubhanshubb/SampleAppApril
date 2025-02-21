import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import React from 'react';
import MIcons from 'react-native-vector-icons/MaterialIcons';

const TopBackButtonBar = ({handleBack, headingTitle}) => {
  return (
    <View style={styles.heading}>
      <TouchableWithoutFeedback onPress={() => handleBack()}>
        <MIcons name="chevron-left" size={30} color="black" />
      </TouchableWithoutFeedback>
      <Text style={styles.headingTitle}>{headingTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    paddingHorizontal: 20,
    paddingTop: 55,
    flexDirection: 'row',
  },
  headingTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    width: '85%',
  },
});

export default TopBackButtonBar;
