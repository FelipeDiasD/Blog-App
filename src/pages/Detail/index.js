import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'

export default function Detail() {
  const route = useRoute()
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text>This is Detail!</Text>
      <Text>{route.params?.id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
