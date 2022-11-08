import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { Headline, List, Button, FAB } from 'react-native-paper'
import axios from 'axios'
import globalStyles from '../styles/global'
import config from '../config'

const Inicio = ({ navigation }) => {
  const [ clientes, setClientes ] = useState([]);
  const [ consultarApi, setConsultarApi ] = useState(true);

  useEffect( () => {
    const getClientesApi = async () => {
      try {
        const url = `${ config.apiUrl }/clientes`
        const { data } = await axios.get(url)

        setClientes(data);
        setConsultarApi(false);

      } catch (error) {
        console.log(error)
      }
    }

    if(consultarApi){
      getClientesApi();
    }
  }, [ consultarApi ])

  return (
    <View style={ globalStyles.contenedor }>

      <Button
        icon='plus-circle' 
        uppercase 
        onPress={ () => navigation.navigate('NuevoCliente', { setConsultarApi }) }
      >
        Nuevo Cliente
      </Button>

      <Headline style={ globalStyles.titulo }>
        { clientes.length > 0 ? 'Clientes' : 'Aún no hay clientes.' }
      </Headline>
      <FlatList
        data={ clientes }
        keyExtractor={ cliente => cliente.id.toString() }
        renderItem={
          ({ item }) => <List.Item 
                            title={ item.nombre }
                            description={ item.empresa }
                            onPress= { () => navigation.navigate('DetalleCliente', { item, setConsultarApi }) }
                          />
        }
      />

      <FAB
        icon='plus'
        style={ globalStyles.fab }
        onPress={ () => navigation.navigate('NuevoCliente', { setConsultarApi }) }
      />
    </View>
  )
}

export default Inicio