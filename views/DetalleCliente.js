import React from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Headline, Subheading, Text, Button, FAB } from 'react-native-paper'
import axios from 'axios'
import globalStyles from '../styles/global'
import config from '../config'

const DetalleCliente = ({ navigation, route }) => {
  const { nombre, telefono, correo, empresa, id } = route.params.item;
  const { setConsultarApi } = route.params;

  const handleDelete = () => {
    Alert.alert(
      '¿Deseas eliminar este cliente?',
      'Un cliente eliminado no se puede recuperar.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: async () => {
          const url = `${ config.apiUrl }/clientes/${ id }`;

          try {
            await axios.delete(url);


            //Actualizar el estado de setConsultarApi para que realice la consulta a la BD
            setConsultarApi(true);

            //Redireccionar a Inicio
            navigation.navigate('Inicio');

          } catch (error) {
            console.log(error)
          }
        }}
      ])
  }

  return (
    <View style={ globalStyles.contenedor }>
      <Headline style={ globalStyles.titulo }>{ nombre }</Headline>
      <Text style={ styles.texto }>Teléfono: <Subheading>{ telefono }</Subheading></Text>
      <Text style={ styles.texto }>Correo: <Subheading>{ correo }</Subheading></Text>
      <Text style={ styles.texto }>Empresa: <Subheading>{ empresa }</Subheading></Text>

      <Button
        icon='delete'
        mode='contained'
        uppercase
        style={ styles.btnElminar }
        onPress={ handleDelete }
      >
        Eliminar Cliente
      </Button>

      <FAB
        icon='pencil'
        style={ globalStyles.fab }
        onPress={ () => navigation.navigate('NuevoCliente', { cliente: route.params.item, setConsultarApi }) }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 18
  },
  btnElminar: {
    marginTop: 100,
    backgroundColor: 'red'
  }
})

export default DetalleCliente