import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase'
import { db } from '../firebase';


const movieOverview = ({ route: { params } }) => {

    const navigation = useNavigation();

    const user = firebase.auth().currentUser;

    const { filme } = params;

    const saveMovieFavorite = () => {
        db.collection(`${user.uid}`).doc(`${filme.id}`).set({
            id: `${filme.id}`,
            name: `${filme.title}`,
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    const deleteMovieFavorite = () => {
        db.collection(`${user.uid}`).doc(`${filme.id}`).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (

                <TouchableOpacity styles={styles.favoriteButton} onPress={() => saveMovieFavorite()}>
                    <Image style={styles.favoriteButton} source={require('../assets/favorite.png')} />
                </TouchableOpacity>
            )
        });
    }, []);

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.topWrapper}>
                        <Image style={styles.headerImage} source={{ uri: `https://image.tmdb.org/t/p/w500${filme.backdrop_path}` }} />
                        <View style={styles.headerTitleSets}>
                            <Text style={styles.headerTitle}>{filme.title}</Text>
                        </View>
                    </View>
                    <View style={styles.sectionOverview}>
                        <Text style={[styles.textOverview, { paddingBottom: 0 }]}>Sobre:</Text>
                        <Text style={styles.textOverview}>{filme.overview}</Text>
                    </View>

                    <View style={{ borderRadius: 40, overflow: "hidden", backgroundColor: '#F54038', width: '80%', alignSelf:'center' }}>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#1B2727')} onPress={deleteMovieFavorite}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Remv/Favoritos</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default movieOverview

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topWrapper: {
        height: 300
    },
    favoriteButton: {
        width: 25,
        height: 25,
        resizeMode: 'cover'
    },
    headerImage: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderRadius: 12,
        opacity: 0.6,
    },
    headerTitleSets: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontFamily: 'Inter_600SemiBold',
        color: '#f5f5f5',
        textAlign: 'center',
        fontSize: 40,
    },
    textOverview: {
        fontFamily: 'Inter_500Medium',
        textAlign: 'justify',
        color: '#f5f5f5',
        fontSize: 20,
        padding: 25,
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
})