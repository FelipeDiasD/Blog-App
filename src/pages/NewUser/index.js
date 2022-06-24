import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard

} from 'react-native'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

import { Feather } from '@expo/vector-icons'
export default function Login({ navigation }) {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [errorRegister, setErrorRegister] = useState('')

  const auth = getAuth()

  const register = () => {
    createUserWithEmailAndPassword(auth, email, senha)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        navigation.navigate('Home', { email: user.email })
        // ...
      })
      .catch(error => {
        setErrorRegister(true)
        const errorCode = error.code
        const errorMessage = error.message
        // ..
      })

      setEmail('')
      setSenha('')
      Keyboard.dismiss()
  }

  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Crie sua conta!</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira um e-mail"
        type="text"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Insira uma senha"
        type="text"
        onChangeText={text => setSenha(text)}
        value={senha}
      />

      {errorRegister === true ? (
        <View style={styles.contentAlert}>
          <Feather name="alert-circle" size={24} color="#C4C4C4" />
          <Text style={styles.warningAlert}> E-mail ou senha inválida</Text>
        </View>
      ) : (
        <View />
      )}

      {email === '' || senha === '' ? (
        <TouchableOpacity disabled={true} style={styles.buttonRegisterDisabled}>
          <Text style={styles.textButtonRegister}>Criar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonRegister} onPress={register}>
          <Text style={styles.textButtonRegister}>Criar</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.registration}>
        Já tem uma conta?
        <Text
          style={styles.linkSubscribe}
          onPress={() => navigation.navigate('Login')}
        >
          Entrar
        </Text>
      </Text>
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
    fontSize: 24,
    color: '#232630',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center'
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
  buttonRegister: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232630',
    borderRadius: 36,
    marginTop: 30
  },

  buttonRegisterDisabled: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C4C4C4',
    borderRadius: 36,
    marginTop: 30
  },
  textButtonRegister: {
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
