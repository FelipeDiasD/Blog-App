import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './pages/Home'
import Detail from './pages/Detail'
import CategoryPosts from './pages/CategoryPosts'
import Search from './pages/Search'
import Login from './pages/Login'
import NewUser from './pages/NewUser'

const Stack = createNativeStackNavigator()

function Routes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="NewUser"
        component={NewUser}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: 'Detalhes',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#232630'
          }
        }}
      />
      <Stack.Screen
        name="CategoryPosts"
        component={CategoryPosts}
        options={{
          title: 'Categoria',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#232630'
          }
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Procurando algo?',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#232630'
          }
        }}
      />
    </Stack.Navigator>
  )
}

export default Routes
