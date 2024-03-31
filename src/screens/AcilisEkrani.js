import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Background from '../../assets/Background'
import Btn from '../../assets/Btn'

const AcilisEkrani = (props) => {
  return (
    <Background>
      <View style={{ marginHorizontal: 40, marginVertical: 200 }}>
      <Text style={{ color: 'white', fontSize: 64,backgroundColor:'rgba(255, 255, 255, 0.3)',textAlign:'center',right:15,fontWeight: 'bold'}}>GURME </Text>
      <Text style={{ color: 'white', fontSize: 64, marginBottom: 60 ,backgroundColor:'rgba(255, 255, 255, 0.3)',textAlign:'center',right:15,fontWeight: 'bold'}}>ROTA</Text>
      <Btn bgColor={'#2BB789'} textColor='white' btnLabel="Giriş Yap" Press={() => props.navigation.navigate("GirisYap")} />
      <Btn bgColor='white' textColor={'#006A42'} btnLabel="Kayıt Ol" Press={() => props.navigation.navigate("KayitOl")} />
      </View>
    </Background>
  )
}

export default AcilisEkrani

const styles = StyleSheet.create({})