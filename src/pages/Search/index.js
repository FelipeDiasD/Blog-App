import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard
} from 'react-native'

import api from '../../services/api'
import PostItem from '../../Components/PostItem'

import { Feather } from '@expo/vector-icons'

export default function Search() {
  const [input, setInput] = useState('')
  const [posts, setPosts] = useState([])
  const [empty, setEmpty] = useState(false)

  async function handleSearchPost() {
    if (input === '') {
      alert('Digite um nome!!!')
      return
    }

    const response = await api.get(
      `api/posts?filters[title][$containsi]=${input}&populate=cover`
    )

    if (response.data?.data.length === 0) {
      setEmpty(true)
      setPosts([])
      return
    }

    setPosts(response.data.data)
    setEmpty(false)
    setInput('')
    Keyboard.dismiss()
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          value={input}
          onChangeText={text => setInput(text)}
          style={styles.input}
          placeholder="O que está procurando?"
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearchPost}
        >
          <Feather name="search" size={25} color="#000" />
        </TouchableOpacity>
      </View>

      {empty && (
        <View>
          <Text style={styles.emptyText}>
            {' '}
            Ops, não encontramos nenhum resultado
          </Text>
        </View>
      )}

      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={posts}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <PostItem data={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  containerInput: {
    flexDirection: 'row',
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  input: {
    width: '85%',
    backgroundColor: '#C4C4C4',
    height: 45,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    padding: 8,
    fontSize: 16
  },
  searchButton: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C2C2C2',
    height: 45,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12
  },

  emptyText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#C4C4C4'
  }
})
