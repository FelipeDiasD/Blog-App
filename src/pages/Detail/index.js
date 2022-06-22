import React, { useEffect, useState, useLayoutEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Share,
  Modal
} from 'react-native'

import api from '../../services/api'

import { Feather, Entypo } from '@expo/vector-icons'

import { useNavigation, useRoute } from '@react-navigation/native'

import LinkWeb from '../../Components/LinkWeb'

export default function Detail() {
  const route = useRoute()
  const navigation = useNavigation()

  const [post, setPost] = useState({})

  const [links, setLinks] = useState([])

  const [modalVisible, setModalVisible] = useState(false)
  const [openLink, setOpenLink] = useState(false)

  useEffect(() => {
    async function getPost() {
      const response = await api.get(
        `api/posts/${route.params?.id}?populate=cover,category,Opcoes`
      )
      console.log(response.data.data?.attributes?.title)

      setPost(response.data.data)
      setLinks(response.data.data?.attributes?.Opcoes)
    }

    getPost()
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleShare}>
          <Entypo name="share" size={25} color="#FFF" />
        </TouchableOpacity>
      )
    })
  }, [navigation, post])

  async function handleShare() {
    try {
      const result = await Share.share({
        message: `Confira este post: ${post?.attributes?.title}
    
    ${post?.attributes?.description}
    
    Vi lá no app devpost`
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Activity Type')
        } else {
          console.log('Compartilhado com sucesso')
        }
      } else if (result.action == Share.dismissedAction) {
        console.log('Modal fechado')
      }
    } catch (error) {}
  }

  function handleOpenLink(link) {
    setModalVisible(true)
    setOpenLink(link)
  }

  return (
    <SafeAreaView>
      <Image
        style={styles.cover}
        source={{
          uri: `http://192.168.100.105:1337${post?.attributes?.cover?.data?.attributes?.url}`
        }}
        resizeMode="cover"
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{post?.attributes?.title}</Text>

        <Text style={styles.description}>{post?.attributes?.description}</Text>

        {links.length > 0 && <Text style={styles.subTitle}>Links</Text>}

        {links.map(link => (
          <TouchableOpacity
            key={link.id}
            style={styles.linkButton}
            onPress={() => handleOpenLink(link)}
          >
            <Feather name="link" color="#1e4687" size={14} />
            <Text style={styles.linkText}>{link.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal animationType="fade" visible={modalVisible} transparent={true}>
        <LinkWeb
          link={openLink?.url}
          title={openLink?.name}
          closeModal={() => setModalVisible(false)}
        />
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },

  cover: {
    width: '100%',
    height: 230
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 18
  },

  content: {
    paddingHorizontal: 14
  },

  description: {
    lineHeight: 20
  },

  subTitle: {
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 18,
    fontSize: 18
  },

  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },

  linkText: {
    marginLeft: 6,
    color: '#1e4687',
    fontSize: 16
  }
})
