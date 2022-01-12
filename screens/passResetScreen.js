import React from 'react'
import { StyleSheet, Text, TextInput, View, Alert, KeyboardAvoidingView, SafeAreaView, ScrollView, TouchableNativeFeedback, ActivityIndicator } from 'react-native'
import Toast from 'react-native-simple-toast';
import { useState } from 'react';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const passResetScreen = () => {


    const navigation = useNavigation();

    const [email, SetEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const verifica = () => {
        if ((email) !== '') {
            forgotPassword()
            setLoading(true)
        } else {
            setLoading(false)
            Toast.show('Por favor, verifique se todos os campos foram preenchidos.');
        }
    }

    //redefinir Senha
    const forgotPassword = () => {
        auth.sendPasswordResetEmail(email)
            .then(() => {
                // Password reset email sent!
                Toast.show('Redefinição enviada! Verifique seu email.');
                setLoading(false)
                navigation.popToTop();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Toast.show('Por favor, verifique o email digitado.');
                setLoading(false)
            });
    }

    return (
        <KeyboardAvoidingView keyboardVerticalOffset={-280} style={styles.container} behavior="padding">

            <SafeAreaView>
                <ScrollView>

                    <View style={styles.HelpMeWrapper}>

                        <View style={styles.inputContainer}>

                            <Text style={styles.text}>Email</Text>
                            <TextInput placeholder="exemplo@email.com" selectionColor={'grey'} style={styles.input} value={email} onChangeText={text => SetEmail(text)}></TextInput>

                        </View>


                        <View style={{ borderRadius: 40, overflow: "hidden", backgroundColor: '#F54038', marginTop: 40 }}>
                            {!loading && (
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#1B2727')} onPress={verifica}>

                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>Redefinir</Text>
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
                    </View>
                </ScrollView>
            </SafeAreaView>

        </KeyboardAvoidingView>
    )
}

export default passResetScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    HelpMeWrapper: {
        paddingTop: 80,
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
