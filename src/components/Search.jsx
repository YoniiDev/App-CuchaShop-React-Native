import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { colors } from '../constants/colors'
import { FontAwesome6 } from "@expo/vector-icons"

const Search = ({ onSearch = () => { }, error = "", goBack = () => { } }) => {
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
        <FontAwesome6 name="searchengin" size={24} color="white" />
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

export default Search

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18
  },
  input: {
    width: 200,
    padding: 8,
    fontSize: 18,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 10
  }
})