import React from 'react';
import { useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableNativeFeedback, Alert, TextInput, ActivityIndicator } from 'react-native';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';

const registerScreen = () => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nome, setNome] = useState('')

    const handleSingUp = () => {
        setLoading(true)
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                user.updateProfile({
                    displayName: nome //photoURL: imageURL? : "https://cdn.dribbble.com/users/225451/screenshots/3841820/media/5e2f1fcec4a8f13aa47f828b4cf81234.png?compress=1&resize=800x600&vertical=top"
                }).then(() => {
                    Toast.show('Cadastro realizado com sucesso!');
                    console.log("Register.Screen | Cadastro-success, navigating to Initial Screen");
                    auth.signOut()
                    navigation.replace('Initial');
                    // Profile updated!
                }).catch((error) => {
                    // An error occurred
                    // ...
                });

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoading(false)
                Alert.alert(
                    "Algo deu errado",
                    errorMessage,
                )
            });
    }

    const verifica = () => {
        if ((nome, email, password) !== '') {
            handleSingUp()
        } else {
            Toast.show('Por favor, verifique se todos os campos foram preenchidos.');
        }
    }


    return (
        <KeyboardAvoidingView keyboardVerticalOffset={-480} style={styles.container} behavior="padding">

            <SafeAreaView>
                <ScrollView>
                    <View style={styles.topWrapper}>

                        <View style={styles.inputContainer}>

                            <Text style={styles.text}>Nome</Text>
                            <TextInput placeholder="Eduardo" selectionColor={'grey'} style={styles.input} value={nome} onChangeText={text => setNome(text)}></TextInput>

                            <Text style={styles.text}>Email</Text>
                            <TextInput placeholder="exemplo@email.com" selectionColor={'grey'} style={styles.input} value={email} onChangeText={text => setEmail(text)}></TextInput>

                            <Text style={styles.text}>Senha</Text>
                            <TextInput placeholder="Digite sua senha" selectionColor={'grey'} style={styles.input} value={password} onChangeText={text => setPassword(text)} secureTextEntry></TextInput>

                        </View>



                        <View style={{ borderRadius: 40, overflow: "hidden", backgroundColor: '#F54038', marginTop: 30 }}>
                            {!loading && (
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#1B2727')} onPress={verifica}>

                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>Cadastrar</Text>
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

export default registerScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topWrapper: {
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontFamily: "Inter_600SemiBold",
    },
    sectionText: {
        fontSize: 20,
        fontFamily: 'Inter_500Medium',
    },
    text: {
        fontSize: 25,
        padding: '2%',
        fontFamily: 'Inter_600SemiBold',
        color: '#ffff'
    },
    inputContainer: {
        marginTop: '30%'
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
