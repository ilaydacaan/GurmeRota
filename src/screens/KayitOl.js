import {View, Text, Touchable, TouchableOpacity} from 'react-native'
import React from 'react'
import Background from '../../assets/Background'
import Btn from '../../assets/Btn'
import Field from '../../assets/Field'

const KayitOl = props => {
  return (
    <Background>
      <View style={{alignItems: 'center', width: 460}}>
        
        <View

          style={{
            backgroundColor: 'white',
            height: 800,
            width: 480,
            borderTopLeftRadius: 130,
            paddingTop: 20,
            marginTop:200,
            alignItems: 'center',
          }}
          >
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
          Hesap Oluşturun
        </Text>
            
          <Field placeholder="Ad" />
          <Field placeholder="Soyad" />
          <Field
            placeholder="Email"
            keyboardType={'email-address'}
          />
          <Field placeholder="Telefon Numarası" keyboardType={'number'} />
          <Field placeholder="Şifre" secureTextEntry={true} />
          <Field placeholder="Şifreni Doğrula " secureTextEntry={true} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '78%',
              marginTop:  20,
              paddingRight: 16,
              right:25
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>
              By signing in, you agree to our{' '}
            </Text>
            <Text style={{color: '#006A42', fontWeight: 'bold', fontSize: 16}}>
              Terms & Conditions
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent :"center",
              width: '78%',
              paddingRight: 16,
              marginBottom: 10
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>
              and {" "}
            </Text>
            <Text style={{color: '#006A42', fontWeight: 'bold', fontSize: 16}}>
              Privacy Policy
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={'#006A42'}
            btnLabel="Kayıt Ol"
            Press={() => {
              alert('Hesap Oluşturuldu');
              props.navigation.navigate('Login');
            }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Hesabın var mı?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{color: '#006A42', fontWeight: 'bold', fontSize: 16}}>
                Giriş Yap
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  )
}

export default KayitOl

