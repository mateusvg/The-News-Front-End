import React, { useEffect, useState, useForm } from 'react';
import {
  Button,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { TextInput, Alert, Card, Title } from 'react-native-paper';
import { Input, Icon } from 'react-native-elements';

export default function Cadastrar(props, { route, navigation }) {
  //pega o id dos parametros de rota, exportado no arquivo MESSAGECARD.JS na ação de clicar
  const { id, idBairro } = props.route.params;

  const [dados, setData] = useState([]);
  const getCardsMessages = async () => {
    const response = await fetch(
      `https://the-news-back-end.herokuapp.com/menssagensbyidupdate/${id}`
    );
    const jsonObj = await response.json();
    setData(jsonObj);
  };

  useEffect(() => {
    getCardsMessages();
  }, []);

  //atualiza os campos para ficarem reativos e serem alterados.
  const [text, setText] = useState('');

  //realiza PUT DA MENSAGEM

  const [titleMessage, setTitleMessage] = useState('');
  const [messageField, setMessageField] = useState('');
  const [imgField, setImgField] = useState('');

  const simpleAlertHandler = () => {
    alert('Mensagem ATUALIZADA');
  };

  const atualizar = async () => {
    const navegarPagina = () => {
              
          props.navigation.navigate('News', {idBairro})
        
    }

    const resp = await fetch(
      `https://the-news-back-end.herokuapp.com/update/${id}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titleMessage,
          messageField,
          imgField,
          id,
          idBairro,
        }),
      }
    );

    simpleAlertHandler();
    navegarPagina(props);
  };

  //Verifica se retorna dados na API
  if (dados[0]?.idMensagens != undefined) {
    return (
      <View style={{ flex: 1, padding: 24 }}>
        {dados.map((dado) => {
          return (
            <View key={dado.idMensagens}>
              <TextInput value={'ID: ' + dado.idMensagens} />

              <TextInput
                placeholder="Titulo"
                onChangeText={(newText) => setTitleMessage(newText)}
                defaultValue={dado.titulo}
              />

              <TextInput
                onChangeText={(newText) => setMessageField(newText)}
                defaultValue={dado.mensagem}
              />

              <Text style={{ margin: 10, padding: 10 }}>
                <Button title="Atualizar Post" onPress={() => atualizar()} />
              </Text>
            </View>
          );
        })}
      </View>
    );
  } else {
    return <ActivityIndicator  size="large" color="#0000ff" /> ;
  }
}
