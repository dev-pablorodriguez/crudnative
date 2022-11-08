import React, { useState, useEffect } from 'react'
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

const NuevoCliente = ({ navigation, route }) => {
  const [ nombre, setNombre ] = useState('');
  const [ telefono, setTelefono ] = useState('');
  const [ correo, setCorreo ] = useState('');
  const [ empresa, setEmpresa ] = useState('');
  const [ alerta, setAlerta ] = useState(false);

  useEffect( () => {
    if(isUpdatingRecord){
      const { nombre, telefono, correo, empresa } = route.params.cliente;

      setNombre(nombre);
      setTelefono(telefono);
      setCorreo(correo);
      setEmpresa(empresa);
    }
  }, [])

  const { setConsultarApi } = route.params;
  const isUpdatingRecord = !!route.params.cliente;

  //Almacenar cliente en la BD
  const almacenarCliente = async () => {
    //Validar datos
    if(!nombre || !telefono || !correo || !empresa){
      setAlerta(true);
      return;
    }

    //Crear cliente
    const cliente = { nombre, telefono, correo, empresa}

    //Revisar si es edición o creación
    if(isUpdatingRecord){
      //Update cliente hacia la API
      try {
        const url = `${ config.apiUrl }/clientes/${ route.params.cliente.id }`;
        await axios.put(url, cliente);
      } catch (error) {
        console.log(error)
      }
    }else{
      //Post cliente hacia la API
      try {
        const url = `${ config.apiUrl }/clientes`;
        await axios.post(url, cliente);
      } catch (error) {
        console.log(error)
      }
    }

    //Limpiar form
    //El component NuevoCliente se desmonta al navegar a otra screen y se limpia

    //Actualizar el estado de setConsultarApi para que realice la consulta a la BD
    setConsultarApi(true);

    //Redireccionar
    navigation.navigate('Inicio')
  }

  return (
    <View style={ globalStyles.contenedor }>
      <Headline style={ globalStyles.titulo }>
        { isUpdatingRecord ? 'Editar Cliente' : 'Añadir Nuevo Cliente' }
      </Headline>

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
        { isUpdatingRecord ? 'Editar Cliente' : 'Agregar Cliente' }
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