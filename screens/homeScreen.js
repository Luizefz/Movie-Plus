import React, { useLayoutEffect, cleanup } from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native'
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const homeScreen = () => {

    const navigation = useNavigation();


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#1B2727')} onPress={handleSingOut}>
                    <MaterialIcons name="logout" size={24} color="black" />
                </TouchableNativeFeedback>
            }
        })
        return () => {
            cleanup
        };
    }, [])

    const handleSingOut = () => {
        auth.signOut()
            .then(() => {
                console.log("Home.Screen | btn-logOut, logged out and navigating to Initial Screen");
                navigation.popToTop();

            })
    }

    return (
        <View style={{ borderRadius: 40, overflow: "hidden", backgroundColor: '#F54038', marginTop: 30, width: 200 }}>
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
