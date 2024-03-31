import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import GirisYap from './src/screens/GirisYap'
import KayitOl from './src/screens/KayitOl'
import AcilisEkrani from './src/screens/AcilisEkrani'

const Stack=createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='AcilisEkrani'
        screenOptions={{headerShown:false}}>
        <Stack.Screen name="AcilisEkrani" component={AcilisEkrani}/>
        <Stack.Screen name="GirisYap" component={GirisYap}/>
        <Stack.Screen name="KayitOl" component={KayitOl}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})