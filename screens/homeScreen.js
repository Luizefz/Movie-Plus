import React, { useEffect, cleanup, useRef, useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from '../firebase';
import * as firebase from 'firebase'
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import CarouselTopics from './components/CarouselTopics';

const homeScreen = () => {


    const navigation = useNavigation();

    const user = firebase.auth().currentUser;

    const apiKey = 'api_key=dd94e9b7e8d050a7115321fa72aaf943'
    const language = 'language=pt-BR';

    const refCarousel = useRef(null);
    const [listaTrending, setListaTrending] = useState();
    const [listaPopular, setListaPopular] = useState();
    const [listaTopRated, setTopRated] = useState();
    const [listaAnimationMovies, setAAnimationMovies] = useState();

    const handleSingOut = () => {
        auth.signOut()
            .then(() => {
                console.log("Home.Screen | btn-logOut, logged out and navigating to Initial Screen");
                navigation.replace("Initial");

            })
    }

    async function getTrending() {
        const request = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?${apiKey}&${language}`);
        setListaTrending(request.data.results);
        return request;
    }

    async function getPopular() {
        const request = await axios.get(`https://api.themoviedb.org/3/movie/popular?${apiKey}&${language}`);
        setListaPopular(request.data.results);
        return request;
    }

    async function getTopRated() {
        const request = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?${apiKey}&${language}&region=BR`);
        setTopRated(request.data.results);
        return request;
    }

    async function getAnimationMovies() {
        const request = await axios.get(`https://api.themoviedb.org/3/discover/movie?${apiKey}&${language}&with_genres=16`);
        setAAnimationMovies(request.data.results);
        return request;
    }

    useEffect(() => {
        getTrending();
        getPopular();
        getTopRated();
        getAnimationMovies();
        navigation.canGoBack();

    }, [cleanup]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `Olá, ${user.displayName}!`,
            headerRight: () => (
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity styles={styles.favoriteButton} onPress={() => navigation.navigate('Favorites')}>
                        <Image style={styles.favoriteButton} source={require('../assets/favorite.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity styles={styles.lodOutButton} onPress={() => handleSingOut()}>
                        <Image style={styles.logOutButton} source={require('../assets/logout.png')} />
                    </TouchableOpacity>

                </View>
            )
        });
    }, []);

    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Overview', { filme: item })}>
                <Image style={styles.carouselImage} source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} />
                <Text style={styles.carouselText}>{item.title}</Text>
            </TouchableOpacity>
        )
    };


    return (
        <SafeAreaView>
            <ScrollView>

                <View style={styles.container}>
                    <View style={styles.topWrapper}>
                        <View style={styles.slideView}>
                            <Carousel
                                style={styles.carousel}
                                ref={refCarousel}
                                data={listaTrending}
                                renderItem={_renderItem}
                                sliderWidth={Dimensions.get('window').width}
                                itemWidth={Dimensions.get('window').width}
                                inactiveSlideScale={0.9}
                                inactiveSlideOpacity={0.9}
                                autoplay={true}
                                loop={true}
                            />
                        </View>
                    </View>
                    <View style={styles.bodyWrapper}>
                        <CarouselTopics title="Filmes Populares" lista={listaPopular} />
                        <CarouselTopics title="Melhores Avaliações" lista={listaTopRated} />
                        <CarouselTopics title="Animações" lista={listaAnimationMovies} />
                    </View>

                </View>
                <StatusBar style="light" />
            </ScrollView>
        </SafeAreaView>
    )
}

export default homeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topWrapper: {
        //paddingTop: 10,

    },
    bodyWrapper: {
        paddingLeft: 20,
    },
    welcomeText: {
        fontFamily: 'Inter_500Medium',
        color: '#ffff',
        fontSize: 24,
    },

    logOutButton: {
        width: 30,
        height: 30,
        resizeMode: 'cover'
    },
    favoriteButton: {
        width: 30,
        height: 30,
        marginRight: 20
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
    slideView: {
        width: '100%',
        height: 600,
        justifyContent: 'center',
        alignItems: 'center'
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        opacity: 0.6,
    },
    carouselText: {
        fontFamily: 'Inter_700Bold',
        color: '#f5f5f5',
        fontSize: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
        borderRadius: 12,
        padding: 10,
        bottom: 0,
    },
})
