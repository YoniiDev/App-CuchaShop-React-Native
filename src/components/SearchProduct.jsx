import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { colors } from '../constants/colors'
import { Colors } from 'react-native/Libraries/NewAppScreen'


const SearchProduct = ({ onSearch = () => { }, error = "", goBack = () => { } }) => {
  const [keyword, setKeyword] = useState("")
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Search...'
        value={keyword}
        onChangeText={setKeyword}
      />
      <Pressable onPress={() => onSearch(keyword)}>
        <FontAwesome5 name="searchengin" size={24} color="white" />
      </Pressable>
      <Pressable onPress={() => setKeyword("")}>
        <FontAwesome5 name="eraser" size={24} color="white" />
      </Pressable>
      <Pressable onPress={goBack}>
        <AntDesign name="back" size={24} color="white" />
      </Pressable>
      {error ? <Text>{error}</Text> : null}
    </View>
  )
}

export default SearchProduct

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.green3,
    paddingBottom: 10
  },
  input: {
    width: 240,
    height:35,
    padding: 8,
    fontSize: 14,
    backgroundColor: colors.white,
    color: colors.black,
    borderRadius: 18
  }
})