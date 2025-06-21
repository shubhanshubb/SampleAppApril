import {View, Text, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleLoginTypeChange = role => {
    if (!userData.email || !userData.password) {
      alert('Please enter both email and password');
      return;
    }
    navigation.navigate('Todo', {role});
    // Clear user data after navigation
    AsyncStorage.setItem('userData', userData.email)
      .then(() => {
        console.log('User data saved:', userData.email);
        setUserData({
          email: '',
          password: '',
        });
      })
      .catch(error => {
        console.error('Error saving user data:', error);
      });
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        value={userData?.email?.toLowerCase()}
        onChangeText={text => setUserData({...userData, email: text})}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 12,
          margin: 10,
          paddingHorizontal: 10,
          backgroundColor: 'white',
          width: '80%',
        }}
      />
      <TextInput
        placeholder="Password"
        value={userData?.password}
        onChangeText={text => setUserData({...userData, password: text})}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 12,
          margin: 10,
          paddingHorizontal: 10,
          backgroundColor: 'white',
          width: '80%',
        }}
      />
      <Button
        loginType="email"
        title="Login as student"
        onPress={() => handleLoginTypeChange('student')}
      />

      <Button
        loginType="tutor"
        title="Login as tutor"
        onPress={() => handleLoginTypeChange('tutor')}
      />
    </View>
  );
};

export default Login;
