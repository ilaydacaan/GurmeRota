import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Background from '../../assets/Background';
import Btn from '../../assets/Btn';

const AnaSayfa = (props) => {
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <Background>
      <View style={{ alignItems: 'center', width: 460 }}>
        {!showFoodModal && (
          <View
            style={{
              backgroundColor: 'white',
              height: 700,
              width: 460,
              borderTopLeftRadius: 130,
              paddingTop: 90,
              marginTop: 300,
              alignItems: 'center',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('C:/ilo Gurme Rota/src/images/Animation - 1716137152624.gif')}
                style={{ width: 80, height: 80, marginRight: -40, marginTop: -50, marginLeft: -50 }}
              />
              <Text style={{ fontSize: 40, color: '#006A42', fontWeight: 'bold', marginTop: -40, marginLeft: 40 }}>
                GURME ROTA
              </Text>
            </View>

            <View style={{ marginTop: 40, width: '80%', marginLeft: 20 }}>
              <Btn
                textColor='white'
                bgColor={'#006A42'}
                btnLabel="En Meşhur Yemekler"
                Press={() => props.navigation.navigate("EnMeshurYemekler")}
              />
            </View>

            <View style={{ marginTop: 20, width: '80%', marginLeft: 20 }}>
              <Btn
                textColor='white'
                bgColor={'#006A42'}
                btnLabel="Yemekler"
                Press={() => setShowFoodModal(true)}
              />
            </View>

            <View style={{ marginTop: 20, width: '80%', marginLeft: 20 }}>
              <Btn
                textColor='white'
                bgColor={'#006A42'}
                btnLabel="Alışveriş Listem"
                Press={() => props.navigation.navigate("AlisverisListesi")}
              />
            </View>

            <View style={{ marginTop: 20, width: '80%', marginLeft: 20 }}>
              <Btn
                textColor='white'
                bgColor={'#006A42'}
                btnLabel="Profilim"
                Press={() => props.navigation.navigate("Profilim")}
              />
            </View>
          </View>
        )}

        {showFoodModal && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showFoodModal}
            onRequestClose={() => setShowFoodModal(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ alignItems: 'center', marginBottom: 20, marginLeft: 60 }}>
                  <Btn
                    textColor='white'
                    bgColor={'#006A42'}
                    btnLabel="Tüm Yemekler"
                    Press={() => {
                      setShowFoodModal(false);
                      props.navigation.navigate("YemekListe"); // YemekListe.js ekranına yönlendir
                    }}
                  />
                </View>
                <Text style={{ marginBottom: 15, textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>Şehir Seç</Text>
                <Picker
                  selectedValue={selectedCity}
                  style={{ height: 50, width: 250 }}
                  onValueChange={(itemValue) => setSelectedCity(itemValue)}
                >
                  {["ADANA", "ADIYAMAN", "AFYON", "AKSARAY", "AMASYA", "ANKARA", "ANTALYA", "ARDAHAN", "ARTVİN", "AYDIN", "AĞRI", "BALIKESİR", "BARTIN", "BATMAN", "BAYBURT", "BİLECİK", "GAZİANTEP", "HATAY", "KAYSERİ"].map(city => (
                    <Picker.Item key={city} label={city} value={city} style={{ fontWeight: 'bold', fontSize: 18 }} />
                  ))}
                </Picker>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: '#006A42', marginTop: 20 }}
                  onPress={() => {
                    alert(`Seçilen Şehir: ${selectedCity}`);
                    setShowFoodModal(false);
                  }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Seçimi Onayla</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: 'red', marginTop: 10 }}
                  onPress={() => {
                    setShowFoodModal(false);
                  }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Kapat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Beyaz arka planı transparan yapar
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  }
});

export default AnaSayfa;
