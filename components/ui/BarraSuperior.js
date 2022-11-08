import { Button } from 'react-native-paper'

const BarraSuperior = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('NuevoCliente');
  }

  return (
    <Button
      icon=''
      textColor='#FFF' 
      onPress={ handlePress }
    >
      Nuevo Cliente
    </Button>
  )
}

export default BarraSuperior