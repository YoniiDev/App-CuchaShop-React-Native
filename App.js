import { StyleSheet, View } from 'react-native';
import Header from './src/components/Header'
import Home from './src/screens/Home'
import { colors } from './src/constants/colors';
import ItemListCategory from './src/screens/ItemListCategory'
import { useCallback, useState } from 'react';
// import { useFonts } from "expo-font"
// import * as SplashScreen from 'expo-splash-screen';

const App = () => {

  const [categorySelected, setCategorySelected] = useState("")
  
  return (
    <View style={styles.container}>
      <Header title={"CuchaShop"} />
      {!categorySelected ? (
        <Home setCategorySelected={setCategorySelected} />
      ) : (
        <ItemListCategory categorySelected={categorySelected}
          setCategorySelected={setCategorySelected} />
      )}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.green1
  }
})

export default App;