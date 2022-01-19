import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, ImageBackground, TouchableNativeFeedback, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';

const initialScreen = () => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);

    const goSingUp = () => {
        console.log("Initial.Screen | btn-cadastrar, navigating to Register Screen");
        navigation.navigate("Register");
    }

    const goSingIn = () => {
        console.log("Initial.Screen | btn-login, navigating to Login Screen");
        navigation.navigate("Login");
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace('Home', {idUser: user.uid, nameUser: user.displayName});
            } else {
                // User is signed out
                setLoading(false)
                navigation.canGoBack()
            }
            setLoading(false)
        });

        return unsubscribe

    }, [])

    /*useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace('Home', {idUser: user.uid, nameUser: user.displayName});
            } else {
                // User is signed out
                setLoading(false)
                navigation.canGoBack()
            }
            setLoading(false)
        });

        return unsubscribe

    }, [])*/

    return (


        <SafeAreaView>
            <ScrollView>

                <View style={styles.container}>
                    <View style={styles.topWrapper}>
                        <Text style={[styles.welcomeText, { fontFamily: 'Inter_400Regular' }]}>Seja Bem-vindo ao</Text>
                        <Text style={styles.welcomeText}>Moovie Plus.</Text>

                        <Image source={require('../assets/peopleCinema.png')} style={styles.imageCenter}></Image>

                        <Text style={styles.descriptionText}>Tudo sobre os filmes que acabaram de sair no cinema em um clique.</Text>

                        {!loading && (
                            <View style={{ borderRadius: 40, overflow: "hidden", backgroundColor: '#F54038' }}>
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#1B2727')} onPress={goSingIn}>

                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>Login</Text>
                                    </View>

                                </TouchableNativeFeedback>
                            </View>
                        )}
                        {loading &&
                            <View style={{ borderRadius: 40, overflow: "hidden", backgroundColor: '#F54038' }}>
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#1B2727')}>

                                    <View style={styles.button}>
                                        <View style={styles.activeIndicator}>
                                            <ActivityIndicator size="large" color="#f5f5f5" />
                                        </View>
                                    </View>

                                </TouchableNativeFeedback>
                            </View>

                        }
                        <View style={{ borderRadius: 40, overflow: "hidden", marginTop: 10, borderColor: '#1B2727', borderWidth: 3 }}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#F54038')} onPress={goSingUp}>

                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Cadastre-se!</Text>
                                </View>

                            </TouchableNativeFeedback>
                        </View>

                    </View>



                    <StatusBar style="light" />
                </View>
            </ScrollView>
        </SafeAreaView>

        //</ImageBackground>
    )
}

export default initialScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    imageCenter: {
        width: '100%',
        height: 380,
        resizeMode: 'cover',
    },
    topWrapper: {
        paddingHorizontal: 30,
        paddingTop: '15%',
    },
    welcomeText: {
        fontFamily: 'Inter_500Medium',
        color: '#ffff',
        fontSize: 24,
    },
    descriptionText: {
        fontFamily: 'Inter_500Medium',
        textAlign: 'left',
        color: '#ffff',
        fontSize: 20,
        marginBottom: 40,
    },
    button: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'Inter_500Medium',
        textAlign: 'center',
        color: '#f5f5f5',
        fontSize: 23,
    },
    registerText: {
        fontFamily: 'Inter_500Medium',
        textAlign: 'center',
        color: '#f5f5f5',
        fontSize: 16,
        marginBottom: '3%',
        marginTop: '3%',
    },
    activeIndicator: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
        height: 60,
    }
})
