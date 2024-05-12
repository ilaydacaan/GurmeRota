import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import GirisYap from './src/screens/GirisYap'
import KayitOl from './src/screens/KayitOl'
import AcilisEkrani from './src/screens/AcilisEkrani'
import Anasayfa from './src/screens/Anasayfa';
import useAuth from './hooks/useAuth'

const Stack = createStackNavigator();
const App = () => {
  const user = useAuth();
  if (user) {
    return ( // bu kısımda artık giriş yaptıktan sonraki ana ekranı koyucaksın
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Anasayfa'
          screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Anasayfa" component={Anasayfa} />
          <Stack.Screen name="AcilisEkrani" component={AcilisEkrani} />
          <Stack.Screen name="GirisYap" component={GirisYap} />
          <Stack.Screen name="KayitOl" component={KayitOl} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='AcilisEkrani'
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AcilisEkrani" component={AcilisEkrani} />
          <Stack.Screen name="GirisYap" component={GirisYap} />
          <Stack.Screen name="KayitOl" component={KayitOl} />

        </Stack.Navigator>
      </NavigationContainer>
    )
  }

}

export default App

const styles = StyleSheet.create({})