import React, { useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, ImageBackground, TouchableNativeFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const initialScreen = () => {

    const navigation = useNavigation();

    const goSingUp = () => {
        console.log("Initial.Screen | btn-cadastrar, navigating to Register Screen");
        navigation.navigate("Register");
    }

    const goSingIn = () => {
        console.log("Initial.Screen | btn-login, navigating to Login Screen");
        navigation.navigate("Login");
    }

    return (


        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.container}>



                    <View style={styles.throwWrapper}>
                        <Text style={[styles.welcomeText, { fontFamily: 'Inter_400Regular' }]}>Seja Bem-vindo ao</Text>
                        <Text style={styles.welcomeText}>Moovie Plus.</Text>

                        <Image source={require('../assets/peopleCinema.png')} style={styles.imageCenter}></Image>

                        <Text style={styles.descriptionText}>Tudo sobre os filmes que acabaram de sair no cinema em um clique.</Text>


                        <View style={{ borderRadius: 40, overflow: "hidden", backgroundColor: '#F54038' }}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#1B2727')} onPress={goSingIn}>

                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Login</Text>
                                </View>

                            </TouchableNativeFeedback>
                        </View>

                        <View style={{ borderRadius: 40, overflow: "hidden", marginTop: 10, borderColor: '#1B2727', borderWidth: 3 }}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#F54038')} onPress={goSingUp}>

                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Cadastrar</Text>
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
    throwWrapper: {
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
})
