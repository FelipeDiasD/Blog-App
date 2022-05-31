import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Touchable
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons'

export default function Home() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}></Text>

        <TouchableOpacity style={styles.button}>
          <Feather
            name="search"
            size={25}
            color="#FFF"
            onPress={navigation.navigate('Search')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232630'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 24
  }
})
