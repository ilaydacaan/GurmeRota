import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {db} from 'C:/Users/canil/Downloads/ilo Gurme Rota/config/firebase'; // Firebase yapılandırma dosyasını göreceli bir yolla içe aktarın

const firebaseApp = initializeApp(db);
const db = getFirestore(firebaseApp);

const Anasayfa = () => {
  const [loading, setLoading] = useState(true);
  const [yemekler, setYemekler] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('yemekler').onSnapshot(snapshot => {
      const yemekList = [];
      snapshot.forEach(doc => {
        yemekList.push({ id: doc.id, ...doc.data() });
      });
      setYemekler(yemekList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Yemekler</Text>
      <FlatList
        data={yemekler}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 18 }}>{item.isim}</Text>
            <Text>{item.aciklama}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Anasayfa;
