import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-simple-toast';
import * as firebase from 'firebase'
import { db } from '../firebase';


const movieOverview = ({ route: { params } }) => {

    const navigation = useNavigation();
    const user = firebase.auth().currentUser;
    const { filme } = params;

    const saveMovieFavorite = () => {
        db.collection(`${user.uid}`).doc(`${filme.id}`).set({
            id: `${filme.id}`,
            title: `${filme.title}`,
            poster: `${filme.poster_path}`,
            backdrop_path: `${filme.backdrop_path}`,
            vote_average: `${filme.vote_average}`,
            overview: `${filme.overview}`,
        })
            .then((docRef) => {
                Toast.show('Filme adicionado aos favoritos!');
                console.log("Document written with ID: ", `${filme.id}`);
            })
            .catch((error) => {
                Toast.show('Algo deu errado. ', error);
                console.error("Error adding document: ", error);
            });
    }

    const deleteMovieFavorite = () => {
        db.collection(`${user.uid}`).doc(`${filme.id}`).delete().then(() => {
            Toast.show('Filme retirado dos favoritos!');
            console.log("Document successfully deleted!");
        }).catch((error) => {
            Toast.show('Algo deu errado. ', error, Toast.LONG);
            console.error("Error removing document: ", error);
        });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity styles={styles.favoriteButton} onPress={() => saveMovieFavorite()} onLongPress={() => deleteMovieFavorite()}>
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

                        <Image style={styles.headerImage} blurRadius={3} source={{ uri: `https://image.tmdb.org/t/p/w500${filme.backdrop_path}` }} />
                        <View style={styles.sectionTitle}>
                            <Text style={styles.headerTitle}>{filme.title}</Text>
                        </View>

                        <View style={styles.sectionRating}>
                            <Image style={styles.starRatting} source={require('../assets/star.png')} />
                            <Text style={styles.movieRating}>{filme.vote_average}</Text>
                        </View>
                    </View>

                    <View style={styles.sectionOverview}>
                        <Text style={styles.textOverview}>Sobre:</Text>
                        <Text style={[styles.textOverview, { paddingBottom: 110 }]}>{filme.overview}</Text>
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

    },
    favoriteButton: {
        width: 28,
        height: 28,
        top: 0
    },
    headerImage: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
        opacity: 0.6,
    },
    sectionTitle: {
        position: 'absolute',
        width: '100%',
        height: 400,
        padding: 25,
        paddingBottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    headerTitle: {
        fontFamily: 'Inter_600SemiBold',
        color: '#f5f5f5',
        fontSize: 40,
    },
    sectionRating: {
        width: '18%',
        height: 45,
        paddingVertical: 10,
        paddingLeft: 23,
        flexDirection: 'row',
        alignItems: 'center',
    },
    starRatting: {
        width: 24,
        height: 24,
    },
    movieRating: {
        fontFamily: 'Inter_500Medium',
        color: '#f5f5f5',
        fontSize: 15,
        paddingLeft: 3
    },
    textOverview: {
        fontFamily: 'Inter_500Medium',
        color: '#f5f5f5',
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 25,
    },
})