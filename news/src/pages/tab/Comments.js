import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Avatar,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import { Icon } from 'react-native-elements';
import Input from '../../components/Input';
import MessageCards from '../../components/MessageCards';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

//passo o props, para o componente de MESSAGECARDS, que recebe o navigation. LA NO MESSAGECARDS EU CHAMO A PROPRIEDADE EM COLCHETES NAVIGATION E ROUTE
const NewsScreen = (props) => {
  const { idMensagens, idBairro } = props.route.params;

  const [commentField, setCommentField] = useState('');

  const uri2 = 'https://the-news-back-end.herokuapp.com/comentarmensagem';
  const cadastrar = async () => {
    const resp = await fetch(uri2, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ commentField, idMensagens }),
    });
    this.textInputMsm.clear();
    getCardsMessages();
  };

  const buscarComentarios = async () => {};
  const [isLoading, setLoading] = useState(true);
  const [dados, setData] = useState([]);
  const getCardsMessages = async () => {
    try {
      const response = await fetch(
        `https://the-news-back-end.herokuapp.com/comentariosmensagem/${idMensagens}`
      );
      const jsonObj = await response.json();
      setData(jsonObj);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCardsMessages();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, padding: 1 }}>
        <View>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 1,
            }}>
            Pagina Comentários
          </Text>

          <View>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View>
                {dados == 0 ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: 60,
                      fontWeight: 'bold',
                    }}>
                    Mensagem sem comentários
                  </Text>
                ) : (
                  <ScrollView style={{ marginBottom: 200 }}>
                    <FlatList
                      data={dados}
                      keyExtractor={({ messageId }, index) => messageId}
                      renderItem={({ item }) => (
                        <View>
                          <View style={styles.container}>
                            <TouchableOpacity onPress={() => {}}>
                              <Image
                                style={styles.image}
                                source={require('../../assets/1.png')}
                              />
                            </TouchableOpacity>
                            <View style={styles.content}>
                              <View style={styles.contentHeader}>
                                <Text style={styles.name}>
                                  Nº {item.idComentarios}
                                </Text>
                                <Text style={styles.time}>10:58 am</Text>
                              </View>
                              <View style={styles.contentFooter}>
                                <Text>{item.comentariosMensagens}</Text>
                                <TouchableOpacity
                                  style={styles.icon}
                                  onPress={() => {}}>
                                  <Icon name="delete" color="#517fa4" />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      )}
                    />
                  </ScrollView>
                )}
              </View>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <TextInput
            style={styles.footerInput}
            ref={(inputMsm) => {
              this.textInputMsm = inputMsm;
            }}
            onChangeText={(text) => setCommentField(text)}
            placeholder="Comentários"
          />
          <Button title="Add Comment" onPress={() => cadastrar()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  contentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  icon: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginRight: 10,
  },

  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 10,
  },
  time: {
    fontSize: 11,
    color: '#808080',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  footerInput: {
    height: 50,
  },
});

export default NewsScreen;
