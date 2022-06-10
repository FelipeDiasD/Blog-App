import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

import { useNavigation } from '@react-navigation/native'

export default function CategoryItem({ data, favorite }) {
  const navigation = useNavigation()

  function handleNavigate() {
    navigation.navigate('CategoryPosts', {
      id: data.id,
      title: data?.attributes?.Name
    })
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={handleNavigate}
      onLongPress={favorite}
    >
      <Image
        style={styles.iconImage}
        source={{
          uri: `http://192.168.100.105:1337${data?.attributes?.icon?.data?.attributes?.url}`
        }}
      />
      <Text>{data?.attributes?.Name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginLeft: 8,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  iconImage: {
    width: 40,
    height: 40
  }
})
