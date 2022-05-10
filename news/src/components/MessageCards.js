import React, { useEffect, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Icon } from 'react-native-elements';

import {getCardsMessages} from '../services/api/getCardsMessages'

import app from '../../App.js';

//Recebe a propriedade navigation para clicar e ir para a pagina de EDITAR
export default function MessageCards(props, { navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);


// COMO EU TINHA FEITO:
//   const getCardsMessages = async () => {
//     try {
//       const response = await fetch(
//         `https://the-news-back-end.herokuapp.com/getmensagembairro/${props.idBairro}`
//       );
//       const jsonObj = await response.json();
//       setData(jsonObj);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getCardsMessages();
//   }, []);

//REFATORADO METODO ACIMA COM CAMADA DE SERVICES
//Metodo que pega todas as mensagens  
  useEffect(() => {
(async () =>
{  setLoading(true)
  const messages = await getCardsMessages(props.idBairro)
  setData(messages);
  setLoading(false)}
)();
  }, []);

  const LeftContent = (props) => <Avatar.Icon {...props} icon="file" />;

  //Metodo que deleta mensagens
  const simpleAlertHandler = () => {
    alert('Mensagem deletada');
  };
  const deletar = async (id) => {
    const resp = await fetch(
      `https://the-news-back-end.herokuapp.com/deletarmensagens/${id}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      }
    );
    simpleAlertHandler();
    getCardsMessages();
  };

  //Metodo que atualiza mensagens ao puxar para baixo.
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getCardsMessages().then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          {data == 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 60, fontWeight: "bold" }}>
              Sem mensagens no bairro
            </Text>
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={data}
              keyExtractor={({ messageId }, index) => messageId}
              renderItem={({ item }) => (
                <Card style={styles.card}>
                  {/*<Card.Title
                  title="Card Title"
                  subtitle="Card Subtitle"
                  left={LeftContent}
                />*/}
                  <Card.Content>
                    <Title>{item.titulo}</Title>
                  </Card.Content>
                  <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                  <Text>{item.mensagem} </Text>
                  <Card.Actions>
                    {/*Recebe a propriedades do componente NewsScreen para clicar e enviar o ID e para navegar para pagina de editar e no segundo parametro do medodo, ele envia o ID que esta atualizando para a pagina UPDATE*/}

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() =>
                        props.navigation.navigate('EditMessage', {
                          id: item.idMensagens, idBairro: props.idBairro
                        })
                      }>
                      <Icon name="edit" color="#517fa4" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => deletar(item.idMensagens)}
                      style={styles.button}>
                      <Icon name="delete" color="#517fa4" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() =>
                        props.navigation.navigate('CommentsScreen', {
                          idMensagens: item.idMensagens,
                          idBairro: props.idBairro,
                        })
                      }>
                      <Icon name="message" color="#517fa4" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() =>
                        props.navigation.navigate('CommentsScreen', {
                          idMensagens: item.idMensagens,
                          idBairro: props.idBairro,
                        })
                      }>
                      
                      <Icon name="report" color="#517fa4" />
                    </TouchableOpacity>

                    {/*<Button onPress={() => deletar(item.id)}>Apagar</Button>*/}
                  </Card.Actions>
                </Card>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 16,
    marginRight: 10,
    borderRadius: 10,
  },

  card: {
    borderRadius: 10,
    marginTop: 15,
    backgroundColor: '#F9F9F9',
  },
});
