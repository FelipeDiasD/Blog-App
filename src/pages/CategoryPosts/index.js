import React, { useLayoutEffect, useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'
import PostItem from '../../Components/PostItem'
import api from '../../services/api'

export default function CategoryPosts() {
  const navigation = useNavigation()
  const route = useRoute()
  const [posts, setPosts] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title === '' ? 'categoria' : route.params?.title
    })
  }, [navigation])

  useEffect(() => {
    async function loadPosts() {
      const response = await api.get(
        `api/categories/${route.params?.id}?fields=name&populate=posts,posts.cover`
      )
      setPosts(response.data?.data?.attributes?.posts?.data)
    }

    loadPosts()
  }, [])

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
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
    alignItems: 'center',
    justifyContent: 'center'
  }
})
