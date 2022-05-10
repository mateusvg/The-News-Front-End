import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const ComponentInput = ({props, email, password, placeholder}) => {
  return (
      <TextInput 
        style={styles.input} 
        placeholder={placeholder}

        {...props}      
      />)
    ;
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFF',
    marginTop:15,
    marginBottom: 8,
    
  },
});

export default ComponentInput;
