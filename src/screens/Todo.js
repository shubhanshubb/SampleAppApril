import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Todo = ({route, navigation}) => {
  const {role} = route.params || {};
  // console.log('Role:', role);
  const [todoList, setTodoList] = useState([]);
  const [newItem, setNewItem] = useState('');

  const handleBackPress = () => {
    navigation.goBack();
    // AsyncStorage.removeItem('userData')
  };

  const addNewTodo = () => {
    if (newItem.trim() === '') {
      alert('Please enter a todo item');
      return;
    }
    setTodoList([...todoList, newItem]);
    setNewItem('');
  };

  const deeleteTodo = index => {
    const updatedList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedList);
  };
  return (
    <View style={styles.container}>
    <View style={styles.headerLine}>
      <Button title='Back' onPress={() => handleBackPress()} />
      <Text style={styles.header}>{role?.toUpperCase()} Todo List</Text>
      </View>
      <TextInput
        value={newItem}
        onChangeText={text => setNewItem(text)}
        placeholder="Enter your todo"
        style={styles.input}
      />

      <TouchableOpacity
        onPress={addNewTodo}
        style={{
          backgroundColor: 'black',
          padding: 6,
          borderRadius: 24,
          marginTop: 24,
          width: '50%',
          alignSelf: 'center',
        }}>
        <Text style={styles.name}>Add Todo</Text>
      </TouchableOpacity>
      <View style={{marginTop: 20}}>
        {todoList?.map((item, index) => (
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              marginHorizontal: 24,
              justifyContent: 'space-around',
            }}
            key={index}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: 'black',
                fontFamily: 'sans-serif',
              }}>
              {index + 1}. {item}
            </Text>
            <Text
              onPress={() => deeleteTodo(index)}
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: 'red',
                fontFamily: 'sans-serif',
              }}>
              Delete
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  headerLine: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#999',
    paddingBottom: 10,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    color: 'white',
    fontFamily: 'sans-serif',
    width: '80%',
  },
  name: {
    fontSize: 30,
    textAlign: 'center',
    // marginTop: 10,
    color: 'white',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 24,
    margin: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});

export default Todo;
