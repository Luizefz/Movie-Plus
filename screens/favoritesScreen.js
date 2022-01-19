import React, { useEffect, cleanup, useRef, useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from '../firebase';
import * as firebase from 'firebase'

const favoritesScreen = () => {

    const navigation = useNavigation();

    const user = firebase.auth().currentUser;

    const refCarousel = useRef(null);

    const [listaMovieFavorite, setMovieFavorite] = useState();

    const getMovieFavorite = () => {
        db.collection(`${user.uid}`)
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    setMovieFavorite(documentSnapshot.data())
                });
            });
    }

    console.log(listaMovieFavorite)




    const _renderItem = ({ item }) => {
        return (
            <Image style={styles.carouselImage} source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }} />
        )
    };

    useEffect(() => {
        getMovieFavorite();
    }, [cleanup]);

    return (
        <SafeAreaView>
                <FlatList 
                style={styles.carousel}
                data={listaMovieFavorite}
                renderItem={_renderItem}
                ref={refCarousel}
                />
        </SafeAreaView>
    )
}

export default favoritesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    carouselImage: {
        width: 500
    }
})
