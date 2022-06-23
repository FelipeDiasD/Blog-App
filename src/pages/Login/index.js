import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Platform
} from 'react-native'

import firebaseApp from '../../config/firebase.js'
import { Feather } from '@expo/vector-icons'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [errorLogin, setErrorLogin] = useState('')

  const loginFirebase = () => {}

  useEffect(() => {}, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Blog App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your e-mail"
        type="text"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Enter your password"
        type="text"
        onChangeText={text => setSenha(text)}
        value={senha}
      />
      {errorLogin === true ? (
        <View style={styles.contentAlert}>
          <Feather name="alert-circle" size={24} color="#C4C4C4" />
          <Text style={styles.warningAlert}> Invalida e-mail or password</Text>
        </View>
      ) : (
        <View />
      )}

      {email === '' || senha === '' ? (
        <TouchableOpacity disabled={true} style={styles.buttonLogin}>
          <Text style={styles.textButtonLogin}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonLogin}>
          <Text style={styles.textButtonLogin}>Login</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.registration}>
        Don't have a registration yet?
        <Text
          style={styles.linkSubscribe}
          onPress={() => navigation.navigate('NewUser')}
        >
          Subscribe now...
        </Text>
      </Text>

      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : 50
  },

  title: {
    fontSize: 48,
    color: '#232630',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  input: {
    width: 300,
    backgroundColor: '#C4C4C4',
    height: 45,
    borderRadius: 12,
    marginTop: 12,
    padding: 8,
    fontSize: 16
  },
  buttonLogin: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232630',
    borderRadius: 36,
    marginTop: 30
  },
  textButtonLogin: {
    color: '#FFFF'
  },
  contentAlert: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  warningAlert: {
    paddingLeft: 10,
    color: '#c4c4c4',
    fontSize: 16
  },

  registration: {
    marginTop: 20,
    color: '#4d5156'
  },

  linkSubscribe: {
    color: '#1877f2',
    fontSize: 16
  }
})
