import { Button } from 'react-native-paper'

const BarraSuperior = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('NuevoCliente');
  }

  return (
    <>
      <Button
      icon='plus'
        textColor='#FFF' 
        onPress={ handlePress }
        uppercase
      >
        Cliente
      </Button>
    </>
  )
}

export default BarraSuperior