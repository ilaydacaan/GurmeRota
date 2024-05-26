import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Background from '../../assets/Background';
import { Picker } from '@react-native-picker/picker';
import Btn from '../../assets/Btn';
import Field from '../../assets/Field';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

const KayitOl = ({ navigation }) => {
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [email, setEmail] = useState('');
  const [yas, setYas] = useState('18');
  const [cinsiyet, setCinsiyet] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (ad === '' || soyad === '' || email === '' || yas === '' || cinsiyet === '' || password.length < 6) {
      alert('Lütfen tüm alanları doldurunuz ve şifrenizi en az 6 karakter uzunluğunda giriniz');
    } else {
      try {
        // Firebase Authentication'da kullanıcı oluştur
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Firestore'a kullanıcı bilgilerini ekle
        await addDoc(collection(db, 'users'), {
          ad: ad,
          soyad: soyad,
          email: email,
          yas: yas,
          cinsiyet: cinsiyet,
          uid: user.uid // Kullanıcının Firebase UID'si
        });

        // Kayıt başarılı olduğunda Anasayfa ekranına yönlendir
        navigation.navigate('Anasayfa');
      } catch (error) {
        console.error("Kayıt olurken bir hata oluştu:", error);
        alert('Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  }

  return (
    <Background>
      <View style={{ alignItems: 'center', width: 460 }}>
        <View
          style={{
            backgroundColor: 'white',
            height: 650,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            marginTop: 250,
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 40, color: '#006A42', fontWeight: 'bold', right: 25, marginTop: -80 }}>
            Kayıt Ol
          </Text>
          <Text style={{ marginBottom: 2 }}></Text>
          <Field 
            placeholder="Ad" 
            value={ad} 
            onChangeText={(text) => setAd(text)} 
            style={{ width: '90%', marginBottom: 15 }} 
            autoCorrect={false} 
            autoCapitalize="none"
          />
          <Field 
            placeholder="Soyad" 
            value={soyad} 
            onChangeText={(text) => setSoyad(text)} 
            style={{ width: '90%', marginBottom: 15 }} 
          />
          <Field 
            placeholder="Email" 
            keyboardType={'email-address'} 
            value={email} 
            onChangeText={(text) => setEmail(text)} 
            style={{ width: '90%', marginBottom: 15 }} 
          />
          <View style={{ borderBottomWidth: 2, borderColor: '#006A42', width: '50%', marginBottom: 15, marginRight: 50 }}>
            <Picker
              selectedValue={yas}
              onValueChange={(itemValue) => setYas(itemValue)}
              style={{ color: yas ? 'black' : 'gray' }}
            >
              {!yas && <Picker.Item label="Yaşınızı Seçiniz" value="" />}
              {Array.from({ length: 83 }, (_, i) => (
                <Picker.Item key={i.toString()} label={(i + 18).toString()} value={(i + 18).toString()} />
              ))}
            </Picker>
          </View>
          <View style={{ borderBottomWidth: 2, borderColor: '#006A42', width: '50%', marginBottom: 15, marginRight: 50 }}>
            <Picker
              selectedValue={cinsiyet}
              onValueChange={(itemValue) => setCinsiyet(itemValue)}
            >
              <Picker.Item label="Cinsiyet Seçiniz" value="" />
              <Picker.Item label="Kadın" value="Kadın" />
              <Picker.Item label="Erkek" value="Erkek" />
              <Picker.Item label="Belirtmek İstemiyorum" value="Belirtmek İstemiyorum" />
            </Picker>
          </View>
          <Field 
            placeholder="Şifre" 
            secureTextEntry={true} 
            value={password} 
            onChangeText={(text) => setPassword(text)} 
            style={{ width: '90%', marginBottom: 15 }} 
          />
          <Btn 
            textColor='white' 
            bgColor={'#006A42'} 
            btnLabel="Kayıt Ol" 
            Press={() => handleSubmit()} 
          />
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", alignItems: 'center' }}>Zaten hesabın var mı? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("GirisYap")}>
              <Text style={{ color: '#006A42', fontWeight: 'bold', fontSize: 16 }}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
}

export default KayitOl;
