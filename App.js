import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigation from './navigation/appNavigation'

const App = () => {
  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor='black' />
   <AppNavigation/>
    </>
  )
}

export default App

const styles = StyleSheet.create({})