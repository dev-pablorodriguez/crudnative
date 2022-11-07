import React from 'react';
import { StyleSheet } from 'react-native';

//React Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

import Inicio from './views/Inicio'
import NuevoCliente from './views/NuevoCliente'
import DetalleCliente from './views/DetalleCliente'

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Inicio'
      >
        <Stack.Screen
          name='Inicio'
          component={ Inicio }
        />
        <Stack.Screen
          name='NuevoCliente'
          component={ NuevoCliente }
          options={{
            title: 'Nuevo Cliente'
          }}
        />
        <Stack.Screen
          name='DetalleCliente'
          component={ DetalleCliente }
          options={{
            title: 'Detalle Cliente'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
});

export default App;
