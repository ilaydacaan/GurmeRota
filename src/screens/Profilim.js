import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Background from '../../assets/Background';
import { auth } from "C:/ilo Gurme Rota/config/firebase.js";
import { useNavigation } from '@react-navigation/native';

const Profilim = () => {
    const navigation = useNavigation();

    const [userData, setUserData] = useState({
        ad: '',
        soyad: '',
        email: '',
        cinsiyet: '',
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                let ad = '';
                let soyad = '';
                let cinsiyet = '';
                if (user.displayName) {
                    const nameParts = user.displayName.split(' ');
                    ad = nameParts[0];
                    soyad = nameParts.length > 1 ? nameParts[1] : '';
                }
                if (user.cinsiyet) {
                    cinsiyet = user.cinsiyet;
                }
                setUserData({
                    ad: ad,
                    soyad: soyad,
                    email: user.email,
                    cinsiyet: cinsiyet,
                });
            } else {
                console.log("No user found!");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            // Navigate to the login screen after logout
            navigation.navigate('GirisYap');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <Background>
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('C:/ilo Gurme Rota/src/images/noGender.gif')}
                            style={styles.profileImage}
                        />
                    </View>
                    <Text style={styles.nameText}>{`${userData.ad} ${userData.soyad}`}</Text>
                    <Text style={styles.emailText}>{userData.email}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Favorilerim')}>
                        <Text style={styles.buttonText}>Favorilerim</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={handleLogout}>
                        <Text style={styles.buttonText}>Çıkış Yap</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
    },
    profileContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        height: 300,
        width: 310,
        borderRadius: 20,
        paddingTop: 50,
        marginTop: 190,
        alignItems: 'center',
        marginLeft: 45, // MarginRight yerine marginLeft kullanarak sola alınacak
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#006A42',
        overflow: 'hidden', // Resmi yuvarlak hale getirmek için gereklidir
        marginBottom: 20,
        marginTop: -110,
    },
    profileImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover', // Resmi yuvarlak hale getirmek için gereklidir
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#006A42',
        marginBottom: 10,
    },
    emailText: {
        fontSize: 20,
        color: 'black',
        marginBottom: 20,
        marginTop: -40,
        fontFamily: 'Times New Roman',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#006A42',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',

    },
});

export default Profilim;
