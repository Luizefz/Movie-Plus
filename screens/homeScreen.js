import React, { useEffect, cleanup, useRef, useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableNativeFeedback, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import CarouselTopics from './components/CarouselTopics';


const homeScreen = () => {


    const navigation = useNavigation();

    const apiKey = 'api_key=dd94e9b7e8d050a7115321fa72aaf943'
    const language = 'language=pt-BR';

    const refCarousel = useRef(null);
    const [listaTrending, setListaTrending] = useState();
    const [listaPopular, setListaPopular] = useState();
    const [listaTopRated, setTopRated] = useState();
    const [listaFictionMovies, setFictionMovies] = useState();
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

    async function getFictionMovies() {
        const request = await axios.get(`https://api.themoviedb.org/3/discover/movie?${apiKey}&${language}&with_genres=878`);
        setFictionMovies(request.data.results);
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
        getTopRated()
        getFictionMovies()
        getAnimationMovies()
        navigation.canGoBack()

    }, [cleanup]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity styles={styles.signOutButton} onPress={() => handleSingOut()}>
                    <Image style={styles.signOutButton} source={require('../assets/logout.png')} />
                </TouchableOpacity>
            )
        });
    }, []);

    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Overview', { filme: item })}>
                <Image style={styles.carouselImage} source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }} />
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
                                itemWidth={380}
                                inactiveSlideScale={0.9}
                                inactiveSlideOpacity={0.9}
                                autoplay={true}
                                loop={true}
                            />
                        </View>

                        <CarouselTopics title="Filmes Populares" lista={listaPopular} />
                        <CarouselTopics title="Melhores Avaliações" lista={listaTopRated} />
                        <CarouselTopics title="Animações" lista={listaAnimationMovies} />
                        <CarouselTopics title="Ficção Científica" lista={listaFictionMovies} />

                    </View>
                </View>
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
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontFamily: 'Inter_500Medium',
        color: '#ffff',
        fontSize: 24,
    },
    slideView: {
        width: '100%',
        height: 220,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signOutButton: {
        width: 30,
        height: 30,
        resizeMode: 'cover'
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
    carouselImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        opacity: 0.6,
    },
    carouselText: {
        fontFamily: 'Inter_700Bold',
        color: '#f5f5f5',
        fontSize: 50,
        justifyContent: 'center',
        width: '100%',
        padding: 10,
        bottom: 0,
        position: 'absolute',
        borderRadius: 12,
        fontSize: 20,
    },
})
