import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Button,
  Text,
  TextInput
} from 'react-native';

import InputComponent from '../components/Input';

import Index from './tab/Index';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();

export default function (props) {

const [email, setEmail] = useState('')
const [senha, setSenha] = useState('')
const [data, setData] = useState('')

  const simpleAlertHandler = () => {
    alert('USUARIO INVALIDO');
  };

const getUser = async () => {
    try {
      const response = await fetch(
        `https://the-news-back-end.herokuapp.com/user/email/${email}`
        
      );
      const jsonObj = await response.json();
      setData(jsonObj);
      const emailMap = data.map((dado) =>{
      if (dado.email == email ){
        props.navigation.navigate('Index')
      }
      else {
        simpleAlertHandler()
      }

      });
    
    } catch (error) {
      console.error(error);
    } 
    
  };


  return (
    <View style={styles.container}>
      <Image style={styles.stretch} resizeMode={'contain'}  source={require('../assets/LOGO-1.png')} />
      <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <TextInput style={styles.input} placeholder="Senha" onChangeText={(text) => setSenha(text)} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => getUser()}>
        <Text style={styles.text}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    paddingBottom: '10%',
  },
  stretch: {
    flex: 1,
    margin:"15%",
    justifyContent: 'center',
    alignItems: 'center',

  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#C68585',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
   input: {
    backgroundColor: '#FFF',
    marginTop:15,
    marginBottom: 8,
    height:50,
    paddingLeft:10,
    borderBottomWidth:1,
    borderBottomColor:'black',
    fontSize:20
  },
});
