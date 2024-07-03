import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';


const Stack = createNativeStackNavigator();


const AppNavigation = () => {
  return (
   <NavigationContainer >
    <Stack.Navigator screenOptions={{
      headerShown:false,
      statusBarStyle: 'light-content',  
      }}>
      <Stack.Screen name="Home"  options={{statusBarColor:'black'}} component={HomeScreen} />
      <Stack.Screen name="Movie" options={{statusBarColor:'black'}} component={MovieScreen} />
      <Stack.Screen name="Person" options={{statusBarColor:'black'}} component={PersonScreen} />
      <Stack.Screen name="Search" options={{statusBarColor:'black'}} component={SearchScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})