import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { colors } from '../constants/colors'



const SearchProduct = ({ onSearch = () => { }, error = "", goBack = () => { } }) => {
  const [keyword, setKeyword] = useState("")
  const hasError = error !== "";
  const containerStyle = hasError ? styles.containerError : styles.container;
  const inputStyle = hasError ? styles.inputError : styles.input;

  return (
    <View style={containerStyle}>

      <TextInput
        style={inputStyle}
        placeholder='Search...'
        value={keyword}
        onChangeText={setKeyword}
      />
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

      <Pressable onPress={() => onSearch(keyword)}>
        <FontAwesome5 name="searchengin" size={28} color="white" />
      </Pressable>
      <Pressable onPress={() => setKeyword("")}>
        <FontAwesome5 name="eraser" size={28} color="white" />
      </Pressable>
      <Pressable onPress={goBack}>
        <AntDesign name="back" size={28} color="white" />
      </Pressable>
    </View>
  )
}

export default SearchProduct

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: colors.green3,
    paddingBottom: 10,
    borderWidth: 2,
    borderColor: 'red',
  },
  containerError: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: colors.green3,
    paddingBottom: 10,
    borderWidth: 2,
    borderColor: 'red',
    height: 70
  },

  input: {
    width: 240,
    height: 35,
    padding: 8,
    fontSize: 14,
    backgroundColor: colors.white,
    color: colors.black,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'red',
    position: 'relative',
  },
  inputError: {
    width: 240,
    height: 35,
    padding: 8,
    fontSize: 14,
    backgroundColor: colors.white,
    color: 'red',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'red',
    position: 'relative',
    textDecorationLine: 'underline'
  },
  errorMessage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
    backgroundColor: colors.white,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'yellow',
    position: 'absolute',
    bottom: 5,
    left: 10,
    paddingHorizontal: 8,
  }
})