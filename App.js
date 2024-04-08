import { StyleSheet, View } from 'react-native';
import Header from './src/components/Header'
import Home from './src/screens/Home'
import { colors } from './src/constants/colors';

const App = () => {
  return (
    <View style={styles.container}>
      <Header title={"CuchaShop"} />
      <Home />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    marginTop:30,
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.green1
  }
})

export default App;