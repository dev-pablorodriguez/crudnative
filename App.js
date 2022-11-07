import React from 'react';
import { StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

//React Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

import Inicio from './views/Inicio'
import NuevoCliente from './views/NuevoCliente'
import DetalleCliente from './views/DetalleCliente'

//Definir el tema
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF'
  }
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Inicio'
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: theme.colors.surface,
          headerTitleStyle: { fontWeight: 'bold' }
      }}
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
