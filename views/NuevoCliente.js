import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { 
  TextInput, 
  Headline, 
  Button, 
  Paragraph, 
  Dialog, 
  Portal
} from 'react-native-paper'
import axios from 'axios'
import globalStyles from '../styles/global'
import config from '../config'

const NuevoCliente = () => {
  const [ nombre, setNombre ] = useState('');
  const [ telefono, setTelefono ] = useState('');
  const [ correo, setCorreo ] = useState('');
  const [ empresa, setEmpresa ] = useState('');
  const [ alerta, setAlerta ] = useState(false);

  //Almacenar cliente en la BD
  const almacenarCliente = async () => {
    //Validar datos
    if(!nombre || !telefono || !correo || !empresa){
      setAlerta(true);
      return;
    }

    //Crear cliente
    const cliente = { nombre, telefono, correo, empresa}

    //Post cliente hacia la API
    try {
      const url = `${ config.apiUrl }/clientes`;
      await axios.post(url, cliente);
    } catch (error) {
      console.log(error)
    }

    //Redireccionar

    //Limpiar form
  }

  return (
    <View style={ globalStyles.contenedor }>
      <Headline style={ globalStyles.titulo }>Añadir Nuevo Cliente</Headline>

      <TextInput
        label='Nombre'
        placeholder='Pablo'
        style={ styles.input }
        value={ nombre }
        onChangeText={ setNombre }
      />

      <TextInput
        label='Teléfono'
        placeholder='123456789'
        keyboardType='numeric'
        maxLength={ 9 }
        style={ styles.input }
        value={ telefono }
        onChangeText={ setTelefono }
      />

      <TextInput
        label='Correo'
        placeholder='pablo@mail.cl'
        keyboardType='email-address'
        style={ styles.input }
        value={ correo }
        onChangeText={ setCorreo }
      />

      <TextInput
        label='Empresa'
        placeholder='Michis Co.'
        style={ styles.input }
        value={ empresa }
        onChangeText={ setEmpresa }
      />

      <Button
        mode='contained'
        icon='pencil-circle'
        uppercase
        onPress={ almacenarCliente }
      >
        Agregar Cliente
      </Button>


        <Portal>
          <Dialog visible={ alerta } onDismiss={ () => setAlerta(false) }>
            <Dialog.Title>Error</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Todos los campos son obligatorios.</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={ () => setAlerta(false) } >OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent'
  }
})

export default NuevoCliente