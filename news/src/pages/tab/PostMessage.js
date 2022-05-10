import React,  { useEffect, useState } from 'react';
import {Button, View, Text} from 'react-native';
import { TextInput, Alert } from 'react-native-paper';
import ImageUpload from '../../components/UploadImage'

export default function Cadastrar(props) {
   const { idBairro, nomeBairro } = props.route.params;

  const uri2 = 'https://the-news-back-end.herokuapp.com/enviarmensagembairro';

  // Limpa os campos após postagem
  const [titleMessage, setTitleMessage] = useState('');
  const [messageField, setMessageField] = useState('');
  const [imgField, setImgField] = useState('');
//Emite alerta após postar a mensagem
  const simpleAlertHandler = () => {
    alert('Mensagem postada','Olá sua mensagem foi postada com sucesso');
  };

  const cadastrar = async () => {
      const resp = await fetch(uri2, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titleMessage, messageField, imgField, idBairro }),
      });
      this.textInputNome.clear()
      this.textInputMsm.clear()
      simpleAlertHandler()
      
  };

  return (
    <View style={{padding:5, margin:10}}>
    <Text>Você vai postar uma mensagem no bairro: {nomeBairro}</Text>
      <TextInput
        ref={inputMsm => { this.textInputMsm = inputMsm }}
        placeholder="Titulo"
        onChangeText={(txt) => setTitleMessage(txt)}
        underlineColorAndroid="transparent"
      />
      <TextInput
        ref={inputNome => { this.textInputNome = inputNome }}
        placeholder="Digite uma mensagem"
        onChangeText={(text) => setMessageField(text)}
        underlineColorAndroid="transparent"
      />
      <ImageUpload onChangeText={(text) => setImgField(text)}
      /> 
      <Text style={{margin:10}}>
       <Button  title="Postar" onPress={() => cadastrar()} /> 
      </Text>
    </View>
  );
}