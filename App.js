import React, { useEffect, useState } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'

import Routes from './src/routes'

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#232630" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#22272E',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
