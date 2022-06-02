import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

export default function CategoryItem(data) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9}>
      <Text>Alow</Text>

      <Image style={styles.iconImage} source={{ uri: '' }} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    backgroundColor: '#FFF'
  }
})
