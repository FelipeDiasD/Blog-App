import React from 'react'

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { WebView } from 'react-native-webview'
export default function LinkWeb(link, title, closeModal) {
  return (
    <>
      <TouchableOpacity onPress={closeModal}>
        <Feather name="x" size={25} color="#FFF" />
        <Text>{title}</Text>
      </TouchableOpacity>
      <WebView source={{ uri: link }} />
    </>
  )
}
