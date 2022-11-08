import React from 'react';
import { StyleSheet, LogBox } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

//React Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

//React Navigation muestra una advertencia al enviar una función como parámetro a una ruta 
//debido a que esta no es una buena práctica. Se recomienda utilizar eventos para detectar
//cambios en los componentes hijos y así enviar esta información a los componentes padres 
//para que estos realicen las operaciones CRUD. Tampoco se recomienda pasar objetos
//complejos para listar la información, en su lugar, debería pasarse solamente el parámetro
//de ID y con éste realizar consultas a la BD en los componentes hijos.
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state.'])


//Views
import Inicio from './views/Inicio'
import NuevoCliente from './views/NuevoCliente'
import DetalleCliente from './views/DetalleCliente'

//Components
import BarraSuperior from './components/ui/BarraSuperior';

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
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Inicio'
          screenOptions={{
            headerStyle: { backgroundColor: theme.colors.primary },
            headerTintColor: theme.colors.surface,
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center'
        }}
        >
          <Stack.Screen
            name='Inicio'
            component={ Inicio }
            // options={ ({ navigation, route }) => ({
            //   headerLeft: (props) => <BarraSuperior 
            //                             { ...props } 
            //                             navigation={ navigation }
            //                             route={ route }
            //                           />
            // })}
          />
          <Stack.Screen
            name='NuevoCliente'
            component={ NuevoCliente }
            options={ ({ route }) => ({
              title: route.params.cliente ? 'Editar Cliente' : 'Nuevo Cliente'
            })}
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
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
});

export default App;
