import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons'

import { getFavorite, setFavorite } from '../../services/favorite'

import api from '../../services/api'

import CategoryItem from '../../Components/CategoryItem'

import FavoritePost from '../../Components/FavoritePost'

import PostItem from '../../Components/PostItem'

export default function Home() {
  const navigation = useNavigation()
  const [categories, setCategories] = useState([])
  const [favCategory, setFavCategory] = useState([])

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadData() {
      await getListPosts()

      const category = await api.get('api/categories?populate=icon')
      setCategories(category.data.data)
    }
    loadData()
  }, [])

  useEffect(() => {
    async function favorite() {
      const response = await getFavorite()

      setFavCategory(response)
    }
  }, [])

  //Buscando posts
  async function getListPosts() {
    setLoading(true)
    const response = await api.get(
      'api/posts?populate=cover&sort=createdAt:desc'
    )
    setPosts(response.data.data)

    setLoading(false)
  }

  //favoritando nossa categoria
  async function handleFavorite(id) {
    const response = await setFavorite(id)

    setFavCategory(response)
    alert('Categoria Favoritada!')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DevBlog</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Feather name="search" size={25} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 12 }}
        style={styles.categories}
        data={categories}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <CategoryItem data={item} favorite={() => handleFavorite(item.id)} />
        )}
      />

      <View style={styles.main}>
        {favCategory.length !== 0 && (
          <FlatList
            style={{ marginTop: 50, maxHeight: 100, paddingStart: 18 }}
            contentContainerStyle={{ paddingEnd: 18 }}
            data={favCategory}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <FavoritePost data={item} />}
          />
        )}

        <Text
          style={[styles.titleMain, { marginTop: favCategory > 0 ? 12 : 46 }]}
        >
          Conteúdos em Alta!
        </Text>

        <FlatList
          style={{ flex: 1, paddingHorizontal: 18 }}
          showsHorizontalScrollIndicator={false}
          data={posts}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <PostItem data={item} />}
          refreshing={loading}
          onRefresh={() => getListPosts()}
        />
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF'
  },

  categories: {
    maxHeight: 115,
    backgroundColor: '#EFEFEF',
    marginHorizontal: 18,
    borderRadius: 8,
    zIndex: 9
  },

  main: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: -30
  },
  titleMain: {
    fontSize: 21,
    paddingHorizontal: 18,
    marginBottom: 14,
    fontWeight: 'bold',
    color: '#162133'
  }
})
