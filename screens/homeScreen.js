import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { SafeAreaView } from 'react-native-web';
import axios from 'axios';


const homeScreen = () => {

    const navigation = useNavigation();


    const apiKey = 'api_key=dd94e9b7e8d050a7115321fa72aaf943'
    const language = 'language=pt-BR';


    const getTrending = async () => {
        const dataTrending = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?${apiKey}&${language}`);

        console.log("AQUI COMEÇA TRENDING", dataTrending);
    }

    const getPopular = async () => {
        const dataPopular = await axios.get(`https://api.themoviedb.org/3/movie/popular?${apiKey}&${language}`);

        console.log("AQUI COMEÇA POPULAR", dataPopular);
    }

    useEffect(() => {
        getTrending();
        getPopular();
    }, []);


    const handleSingOut = () => {
        auth.signOut()
            .then(() => {
                console.log("Home.Screen | btn-logOut, logged out and navigating to Initial Screen");
                navigation.popToTop();

            })
    }


    return (
            <View style={{ borderRadius: 40, overflow: "hidden", backgroundColor: '#F54038', marginTop: 30, width: 300 }}>
                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#1B2727')} onPress={handleSingOut}>

                    <View style={styles.button}>
                        <Text style={styles.buttonText}>LogOut</Text>
                    </View>

                </TouchableNativeFeedback>
            </View>
    )
}

export default homeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'Inter_500Medium',
        textAlign: 'center',
        color: '#f5f5f5',
        fontSize: 23,
    },
})
