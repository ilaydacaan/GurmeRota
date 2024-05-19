import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { app, db, auth } from "C:/ilo Gurme Rota/config/firebase.js";
import { getDocs, collection } from "firebase/firestore";

const YemekListe = () => {
  const [yemekData, setYemekData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "yemekler"));
      const yemekListesi = [];
      querySnapshot.forEach((doc) => {
        const yemekler = doc.data().yemekler;
        yemekler.forEach((yemek) => {
          yemekListesi.push({
            yemek_adi: yemek.yemek_adi,
            imageURL: yemek.imageURL,
          });
        });
      });
      setYemekData(yemekListesi);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Anasayfa")}>
        <Image
          source={require("C:/ilo Gurme Rota/src/images/back.png")}
          style={[styles.backButton, { width: 35, height: 35, marginTop: 20 }]}
        />
      </TouchableOpacity>

      <View style={{ marginTop: 80 }}>
        {yemekData.map((yemek, index) => (
          <View key={index} style={styles.yemekItem}>
            <Image source={{ uri: yemek.imageURL }} style={styles.yemekImage} />
            <Text style={styles.yemekAdi}>{yemek.yemek_adi}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  yemekItem: {
    width: "100%", // Kutucukları genişletmek için genişliği %100 yapın
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "rgba(0, 106, 66, 0.8)", // Yeşil arka plan rengi saydam
  },
  yemekImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  yemekAdi: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
});

export default YemekListe;
