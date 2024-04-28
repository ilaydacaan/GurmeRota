import {View, KeyboardAvoidingView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import React from 'react'
import Background from '../../assets/Background'
import Btn from '../../assets/Btn'
import Field from '../../assets/Field'
import {auth} from '../../firebase'

const GirisYap = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const handleSignIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      Alert.alert('Başarılı', 'Giriş Başarılı');
    } catch (error) {
      Alert.alert('Hata', error.message);
    }
  };


  return (
    <Background>
    <View style={{alignItems: 'center', width: 460}}>

      <View
        style={{
          backgroundColor: 'white',
          height: 700,
          width: 460,
          borderTopLeftRadius: 130, //köşe yuvarlaklığı
          paddingTop: 90, //üst kenara yakınlık
          marginTop:300, //sayfanın üstüyle mesafe
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 40, color: '#006A42', fontWeight: 'bold',right:25}}>
          Hoşgeldiniz
        </Text>
        <Text
          style={{
            color: 'grey',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
            right:25
          }}>
          Hesabınıza Giriş Yapın
        </Text>
        
        <Field
          placeholder="Email"
          value={email} 
          onChangeText={text => setEmail(text)}
          keyboardType={'email-address'}
        />
        <Field placeholder="Şifrenizi giriniz" value={password}
          onChangeText={text => setPassword(text)} secureTextEntry={true} />
        <View
          style={{alignItems: 'flex-end', width: '65%', paddingRight: 18, marginTop:10, marginBottom: 30}}>
          <Text style={{color: '#006A42', fontWeight: 'bold', fontSize: 16,right:23}}>
            Şifremi Unuttum
          </Text>
        </View >
        <Btn textColor='white'   bgColor={'#006A42'} btnLabel="Giriş Yap" Press={() => alert("Giriş Başarılı")} />
        <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
          <Text style={{ fontSize: 16, fontWeight:"bold",alignItems:'center' }}>Hesabın yok mı? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("GirisYap")}>
          <Text style={{ color: '#006A42', fontWeight: 'bold', fontSize: 16 }}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Background>
  )
}

export default GirisYap

