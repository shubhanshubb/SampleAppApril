import {Button, StyleSheet, TextInput, View} from 'react-native';
import React, {useRef, useState} from 'react';
import { Text } from 'react-native-gesture-handler';

const App = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const [error, setError] = useState('');

  const handleInputOtp = (code, index) => {
    if(/^\d+$/.test(code)) {
      setCode(prev => {
        const newCode = [...prev];
        newCode[index] = code;
        return newCode;
      });
      
      // if (index < 3 && code) {
      //   inputs.current[index + 1].focus();
      // } else {
      //   validateCode(code);
      // }
    } 
  };

  const validateCode = code => {
    const enteredCode = code.join('');
    if (enteredCode === '1234') {
      setError('Code is correct');
    } else {
      setError('Incorrect Otp');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.otpContainer}>
        {code?.map((item, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            placeholder="X"
            keyboardType="numeric"
            maxLength={1}
            value={item}
            style={styles.otpInput}
            onChangeText={text => handleInputOtp(text, index)}
            autoFocus={index === 0 ? true : false}
          />
        ))}
      </View>
      {error && <Text>{error}</Text>}
      <Button title="Submit" onPress={() => validateCode(code)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  otpInput: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default App;
