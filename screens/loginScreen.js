import React, { useEffect } from 'react'
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView, TextInput, TouchableNativeFeedback, Alert, ActivityIndicator } from 'react-native'
import Toast from 'react-native-simple-toast';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

const loginScreen = () => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')

    const verifica = () => {
        if ((email, password) !== '') {
            setLoading(true)
            SingIn()
        } else {
            setLoading(false)
            Toast.show('Por favor, verifique se todos os campos foram preenchidos.');
        }
    }

    const SingIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Login.Screen | Login-success, navigating to Home Screen");
                console.log("Login.Screen | ", user.displayName);
                navigation.replace('Home', {idUser: user.uid, nameUser: user.displayName});
                setLoading(false)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setLoading(false)
                Toast.show('Email/Senha incorretos. Verifique os campos preenchidos.', Toast.LONG);
                //"Por favor, verifique as informações digitadas.",
            });
    }

    const goPassReset = () => {
        console.log("Initial.Screen | btn-PassReset, navigating to passReset Screen");
        navigation.navigate("PassReset");
    }


    return (
        <KeyboardAvoidingView keyboardVerticalOffset={-280} style={styles.container} behavior="padding">

            <SafeAreaView>
                <ScrollView>

                    <View style={styles.topWrapper}>

                        <View style={styles.inputContainer}>

                            <Text style={styles.text}>Email</Text>
                            <TextInput placeholder="exemplo@email.com" selectionColor={'grey'} style={styles.input} value={email} onChangeText={text => SetEmail(text)}></TextInput>

                            <Text style={styles.text}>Senha</Text>
                            <TextInput placeholder="Digite sua senha" selectionColor={'grey'} style={styles.input} value={password} onChangeText={text => SetPassword(text)} secureTextEntry></TextInput>

                            <TouchableOpacity onPress={goPassReset} style={styles.esqueciButton}>

                                <Text style={styles.esqueciButton}>Esqueci minha senha.</Text>

                            </TouchableOpacity>

                        </View>

                        <View style={{ borderRadius: 40, overflow: "hidden", backgroundColor: '#F54038', marginTop: 30 }}>
                            {!loading && (
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#1B2727')} onPress={verifica}>

                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>Login</Text>
                                    </View>

                                </TouchableNativeFeedback>
                            )}
                            {loading &&
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#1B2727')}>

                                    <View style={styles.activeIndicator}>
                                        <ActivityIndicator size="large" color="#f5f5f5" />
                                    </View>

                                </TouchableNativeFeedback>
                            }
                        </View>
                        <StatusBar style="light" />
                    </View>
                </ScrollView>
            </SafeAreaView>

        </KeyboardAvoidingView>
    )
}

export default loginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topWrapper: {
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 25,
        padding: '2%',
        fontFamily: 'Inter_600SemiBold',
        color: '#ffff'
    },
    inputContainer: {
        width: '100%',
        marginTop: 150
    },
    esqueciButton: {
        fontSize: 16,
        fontFamily: "Inter_600SemiBold",
        color: '#ffff',
        marginTop: 8
    },
    input: {
        backgroundColor: '#d9d9d9',
        height: 70,
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        fontFamily: 'Inter_500Medium',
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
    activeIndicator: {
        height: 60,
        justifyContent: 'center',
        alignContent: 'center',
    }
})
