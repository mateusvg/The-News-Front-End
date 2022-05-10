import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
} from 'react-native';

import { Icon } from 'react-native-elements';

const HomeProfile = ({ route, navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, padding: 16, }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            Tela de Profile
          </Text>

          <Image
            source={require('../../assets/Profile.png')}
            style={{ width: 120, height: 120, borderRadius: 120 / 2 }}
          />
          <TouchableOpacity style={styles.button}>
            <Icon style={styles.icon} name="person-outline" color="#517fa4" />
            <Text style={styles.text}>Mauro</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>
              <Icon style={styles.icon} name="phone" color="#517fa4" />
              31 9956-49813
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 50 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('DetailsScreenProfile')}>
              <Icon style={styles.icon} name="search" color="#517fa4" />
              <Text>Sobre</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ProfileScreenProfile')}>
              <Text>Configurações</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Welcome')}>
              <Text>SAIR</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
    borderRadius: 20,
  },
  icon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingRight: 20,
  },
  text: {
    textAlign: 'center',
  },
});
export default HomeProfile;
