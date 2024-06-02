import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image, TextInput, Modal } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { app, db, auth } from "C:/ilo Gurme Rota/config/firebase.js";
import { getDocs, collection, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';

const YemekListe = () => {
  const [yemekData, setYemekData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedYemek, setSelectedYemek] = useState(null);
  const [yemekDetail, setYemekDetail] = useState(null);
  const [showMalzemeler, setShowMalzemeler] = useState(false);
  const [showYapilis, setShowYapilis] = useState(false);
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
            id: doc.id,
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

  const fetchYemekDetail = async (id, yemekAdi) => {
    try {
      const docRef = doc(db, "yemekler", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const yemekler = docSnap.data().yemekler;
        const yemek = yemekler.find(y => y.yemek_adi === yemekAdi);
        if (yemek) {
          setYemekDetail({
            id: docSnap.id,
            yemek_adi: yemek.yemek_adi,
            imageURL: yemek.imageURL,
            malzemeler: yemek.malzemeler,
            yapilis: yemek.yapılış || []
          });
          console.log("Yemek Detayları:", yemek);
          console.log("Yapılış Adımları:", yemek.yapılış);
        } else {
          console.log("Yemek bulunamadı");
        }
      } else {
        console.log("Belirtilen yemek bulunamadı");
      }
    } catch (error) {
      console.error("Yemek detayları alınırken bir hata oluştu:", error);
    }
  };

  const handleYemekPress = (yemek) => {
    setSelectedYemek(yemek);
    setModalVisible(true);
    fetchYemekDetail(yemek.id, yemek.yemek_adi);
  };

  const handleShowMalzemeler = () => {
    setShowMalzemeler(true);
    setShowYapilis(false);
  };

  const handleShowYapilis = () => {
    setShowYapilis(true);
    setShowMalzemeler(false);
  };

  const searchYemek = (keyword) => {
    return yemekData.filter((yemek) =>
      yemek.yemek_adi && yemek.yemek_adi.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const filteredItems = searchKeyword ? searchYemek(searchKeyword) : yemekData;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const addToFavorites = async (yemek) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("Kullanıcı oturumu açmamış.");
        return;
      }
  
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
  
      if (!userDoc.exists()) {
        console.log("Kullanıcı belgesi bulunamadı.");
        return;
      }
  
      // Kullanıcı belgesi bulunduğunda favorileri güncelle
      const favoriler = userDoc.data().favoriler || [];
      const favoriYemek = {
        id: yemek.id,
        yemek_adi: yemek.yemek_adi,
        imageURL: yemek.imageURL
      };
      const updatedFavoriler = [...favoriler, favoriYemek];
  
      await updateDoc(userRef, { favoriler: updatedFavoriler });
      console.log("Yemek favorilere eklendi:", favoriYemek);
    } catch (error) {
      console.error("Favorilere eklenirken bir hata oluştu:", error);
    }
  };
  
  
  
  
  
  

  return (
    <ImageBackground source={require("C:/ilo Gurme Rota/src/images/kuf.jpg")} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Anasayfa")}>
        <Image
          source={require("C:/ilo Gurme Rota/src/images/back.png")}
          style={[styles.backButton, { width: 35, height: 35, marginTop: 710 }]}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Yemek Ara..."
        onChangeText={(text) => setSearchKeyword(text)}
        value={searchKeyword}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.yemekListContainer}>
          {currentItems.map((yemek, index) => (
            <TouchableOpacity key={index} style={styles.yemekItem} onPress={() => handleYemekPress(yemek)}>
              <Image source={{ uri: yemek.imageURL }} style={styles.yemekImage} />
              <Text style={styles.yemekAdi}>{yemek.yemek_adi}</Text>
            </TouchableOpacity>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setYemekDetail(null);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            {yemekDetail ? (
              <ScrollView contentContainerStyle={styles.modalScrollView}>
                <Text style={styles.modalTitle}>{yemekDetail.yemek_adi}</Text>
                <Image source={{ uri: yemekDetail.imageURL }} style={styles.modalImage} />
                <View style={styles.showButtonContainer}>
                  <TouchableOpacity onPress={handleShowMalzemeler} style={styles.showButton}>
                    <Text style={styles.showButtonText}>Malzemeler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleShowYapilis} style={styles.showButton}>
                    <Text style={styles.showButtonText}>Yapılış</Text>
                  </TouchableOpacity>
                </View>
                {showMalzemeler && (
                  <>
                    <Text style={styles.modalDescription}>Malzemeler:</Text>
                    {yemekDetail.malzemeler && Object.entries(yemekDetail.malzemeler).map(([key, value]) => (
                      <Text key={key} style={styles.modalText}>{`${key}: ${value}`}</Text>
                    ))}
                  </>
                )}
                {showYapilis && (
                  <>
                    <Text style={styles.modalDescription}>Yapılış:</Text>
                    {yemekDetail.yapilis && yemekDetail.yapilis.map((step, index) => (
                      <Text key={index} style={styles.modalText}>{`${index + 1}. ${step}`}</Text>
                    ))}
                  </>
                )}
                <TouchableOpacity onPress={() => addToFavorites(selectedYemek)} style={styles.favoriteButton}>
                  <Text style={styles.favoriteButtonText}>Favorilere Ekle</Text>
                  <FontAwesome name="heart" size={24} color="red" />
                </TouchableOpacity>
              </ScrollView>
            ) : (
              <Text style={styles.loadingText}>Yükleniyor...</Text>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                setYemekDetail(null);
              }}
            >
              <Text style={styles.textStyle}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    width: "48%",
    marginBottom: 5,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    width: 200,
    marginLeft: 165,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalScrollView: {
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center"
  },
  modalImage: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    marginBottom: 15,
    borderRadius: 10
  },
  modalDescription: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center"
  },
  modalText: {
    fontSize: 17,
    marginBottom: 5,
    textAlign: "left"
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center"
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  showButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  showButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  showButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  favoriteButtonText: {
    color: "white",
    fontWeight: "bold",
    marginRight: 5,
  },
});

export default YemekListe;

