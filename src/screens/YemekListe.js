import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity,Image,TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { app, db, auth } from "C:/ilo Gurme Rota/config/firebase.js";
import { getDocs, collection } from "firebase/firestore";
import { Picker } from '@react-native-picker/picker';

const YemekListe = () => {
  const [yemekData, setYemekData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Sayfa başına gösterilecek yemek sayısı
  const [searchKeyword, setSearchKeyword] = useState(""); // Arama anahtarı
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

  // Sayfa değişiminde kullanılacak işlev
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Arama işlevi
  const searchYemek = (keyword) => {
    return yemekData.filter((yemek) =>
      yemek.yemek_adi && yemek.yemek_adi.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  // Geçerli sayfa için yemekleri filtreleyin
  const filteredItems = searchKeyword ? searchYemek(searchKeyword) : yemekData.slice(indexOfFirstItem, indexOfLastItem);

  // Geçerli sayfa için yemekleri dilimleyin
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Sayfa numaralarını oluşturun
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ImageBackground source={require("C:/ilo Gurme Rota/src/images/kuf.jpg")} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Anasayfa")}>
        <Image
          source={require("C:/ilo Gurme Rota/src/images/back.png")}
          style={[styles.backButton, { width: 35, height: 35, marginTop: 710 }]}
        />
      </TouchableOpacity>

      {/* Arama kutusu */}
      <TextInput
        style={styles.searchInput}
        placeholder="Yemek Ara..."
        onChangeText={(text) => setSearchKeyword(text)}
        value={searchKeyword}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.yemekListContainer}>
          {currentItems.map((yemek, index) => (
            <View key={index} style={styles.yemekItem}>
              <Image source={{ uri: yemek.imageURL }} style={styles.yemekImage} />
              <Text style={styles.yemekAdi}>{yemek.yemek_adi}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Picker
        selectedValue={currentPage}
        style={[styles.picker, { top: -20 }]}
        onValueChange={(itemValue, itemIndex) => setCurrentPage(itemValue)}
      >
        {pageNumbers.map(number => (
          <Picker.Item key={number} label={`Sayfa ${number}`} value={number} />
        ))}
      </Picker>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: -10,
    left: 10,
  },
  searchInput: {
    marginTop: 70,
    marginBottom: -30,
    marginHorizontal: 20,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  yemekListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 100,
  },
  yemekItem: {
    width: "48%", // %50'den biraz daha küçük yapın ki iki yemek yan yana sığsın
    marginBottom: 5,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Yeşil arka plan rengi saydam
  },
  yemekImage: {
    width: "100%",
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
  },
  yemekAdi: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  picker: {
    marginHorizontal: 20,
    marginTop: 0,
    backgroundColor: "rgba(0, 106, 66, 0.8)",
    borderRadius: 5,
    width:200,
    marginLeft:165,
    color: "white",
  },
});

export default YemekListe;
