import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Index from '../pages/tab/Index';
import PostMessage from '../pages/tab/PostMessage'
import CommentsScreen from '../pages/tab/Comments'
import EditMessage from '../pages/tab/EditMessage'
import News from '../pages/tab/News'
import Bairro from '../pages/tab/Neighborhood'
import Cadastrar from '../pages/Signup'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome}  options={{ header: () => null, }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Index" component={Index} options={{ header: () => null, }} />
        <Stack.Screen name="PostMessage" component={PostMessage} />
        <Stack.Screen name="CommentsScreen" component={CommentsScreen} />
        <Stack.Screen name="EditMessage" component={EditMessage} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="Bairro" component={Bairro} />
        <Stack.Screen name="Cadastrar" component={Cadastrar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
