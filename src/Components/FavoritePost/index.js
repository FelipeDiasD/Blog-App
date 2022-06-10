import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

const { width: WIDTH } = Dimensions.get('window')

export default function FavoritePost({ data }) {
  const navigation = useNavigation()

  function handleNavigate() {
    navigation.navigate('Detail', { id: data.id })
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <ImageBackground
        style={styles.cover}
        source={{
          uri: `http://192.168.100.105:1337${data?.attributes?.cover?.data?.attributes?.url}`
        }}
        resizeMode="cover"
        blurRadius={3}
        imageStyle={{ borderRadius: 6, opacity: 0.3 }}
      >
        <Text style={styles.title} numberOfLines={1}>
          {data?.attributes?.title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 8
  },

  cover: {
    borderRadius: 4,
    width: WIDTH - 60,
    height: 100,
    justifyContent: 'flex-end',
    backgroundColor: '#232630'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    paddingVertical: 8,
    paddingLeft: 8,
    textShadowColor: '#000',
    textShadowOffset: { width: 5, height: 3 },
    textShadowRadius: 8
  }
})
