import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Keyboard
} from 'react-native'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import firebaseApp from '../../config/firebase.js'

import { Feather } from '@expo/vector-icons'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [errorLogin, setErrorLogin] = useState('')

  const auth = getAuth()

  const loginFirebase = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        navigation.navigation('Home', { email: user.email })
        // ...
      })
      .catch(error => {
        setErrorLogin(true)
        const errorCode = error.code
        const errorMessage = error.message
        // ..
      })

    setEmail('')
    setSenha('')
    Keyboard.dismiss()
  }

  useEffect(() => {}, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Blog App</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira seu e-mail"
        type="text"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Insira sua senha"
        type="text"
        onChangeText={text => setSenha(text)}
        value={senha}
      />
      {errorLogin === true ? (
        <View style={styles.contentAlert}>
          <Feather name="alert-circle" size={24} color="#C4C4C4" />
          <Text style={styles.warningAlert}>E-mail ou senha inválida</Text>
        </View>
      ) : (
        <View />
      )}

      {email === '' || senha === '' ? (
        <TouchableOpacity disabled={true} style={styles.buttonLoginDisabled}>
          <Text style={styles.textButtonLogin}>Entrar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonLogin} onPress={loginFirebase}>
          <Text style={styles.textButtonLogin}>Entrar</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.registration}>
        Ainda não tem uma conta?
        <Text
          style={styles.linkSubscribe}
          onPress={() => navigation.navigate('NewUser')}
        >
          Crie uma agora...
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

  buttonLoginDisabled: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C4C4C4',
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
