import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { app, db, auth } from "C:/ilo Gurme Rota/config/firebase.js";
import { getDocs, collection, doc, getDoc, query, where, updateDoc } from "firebase/firestore";

const ProfilFavori = () => {
  const [favoriler, setFavoriler] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("Kullanıcı oturumu açmamış.");
          return;
        }

        const userEmail = user.email;

        // Kullanıcının e-posta adresine göre kullanıcı belgesini sorgula
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("Kullanıcı belgesi bulunamadı.");
          return;
        }

        let userDocRef = null;
        querySnapshot.forEach((doc) => {
          userDocRef = doc.ref;
        });

        if (!userDocRef) {
          console.log("Kullanıcı belgesi bulunamadı.");
          return;
        }

        // Kullanıcı belgesindeki favorileri al
        const userDoc = await getDoc(userDocRef);
        const favorilerData = userDoc.data().favoriler || [];
        setFavoriler(favorilerData);
        setLoading(false);
      } catch (error) {
        console.error("Favoriler alınırken bir hata oluştu:", error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (id) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("Kullanıcı oturumu açmamış.");
        return;
      }

      const userEmail = user.email;

      // Kullanıcının e-posta adresine göre kullanıcı belgesini sorgula
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("Kullanıcı belgesi bulunamadı.");
        return;
      }

      let userDocRef = null;
      querySnapshot.forEach((doc) => {
        userDocRef = doc.ref;
      });

      if (!userDocRef) {
        console.log("Kullanıcı belgesi bulunamadı.");
        return;
      }

      // Kullanıcı belgesindeki favoriler listesini güncelle
      const userDoc = await getDoc(userDocRef);
      const favorilerData = userDoc.data().favoriler || [];
      const updatedFavoriler = favorilerData.filter((item) => item.id !== id);

      await updateDoc(userDocRef, { favoriler: updatedFavoriler });
      setFavoriler(updatedFavoriler);
    } catch (error) {
      console.error("Favori silinirken bir hata oluştu:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006A42" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favori Yemeklerim</Text>
      {favoriler.length === 0 ? (
        <Text style={styles.noFavoritesText}>Favori yemeğiniz bulunmamaktadır.</Text>
      ) : (
        <FlatList
          data={favoriler}
          keyExtractor={(item, index) => `${item.id}-${index}`} // Benzersiz anahtar oluşturma
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image source={{ uri: item.imageURL }} style={styles.image} />
              <Text style={styles.itemText}>{item.yemek_adi}</Text>
              <TouchableOpacity onPress={() => removeFavorite(item.id)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Sil</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#006A42',
  },
  title: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006A42',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  noFavoritesText: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
    marginTop: 20,
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfilFavori;
