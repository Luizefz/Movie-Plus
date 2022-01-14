import React, { useEffect, cleanup, useRef, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableNativeFeedback, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

import axios from 'axios';
import Carousel from 'react-native-snap-carousel';


const homeScreen = () => {


    const navigation = useNavigation();

    const apiKey = 'api_key=dd94e9b7e8d050a7115321fa72aaf943'
    const language = 'language=pt-BR';

    const refCarousel = useRef(null);
    const [listaTrending, setListaTrending] = useState([]);

    const [listaPopular, setListaPopular] = useState([
        {
            title: "O justiceiro",
            img: "https://br.web.img3.acsta.net/r_1280_720/pictures/17/10/19/14/40/3658022.jpg"
        },
        {
            title: "Lucca",
            img: "https://br.web.img3.acsta.net/pictures/21/05/07/10/59/3500748.jpg"
        },
        {
            title: "Encanto",
            img: "https://sobresagas.com.br/wp-content/uploads/2021/09/poster1.jpeg"
        }
    ]);

    const getTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?${apiKey}&${language}`);

        setListaTrending(data.results);
    }

    /*const getPopular = async () => {
        const dataPopular = await axios.get(`https://api.themoviedb.org/3/movie/popular?${apiKey}&${language}`);

        console.log(dataPopular);
        setListaPopular(dataPopular.data.results);
    }*/


    const _renderItem = ({ item, index }) => {
        return (
            <View>
                <Image style={styles.carouselImage} source={{ uri: item.img }} />
                <Text style={styles.carouselText}>{item.title}</Text>
            </View>
        )
    };

    useEffect(() => {
        getTrending();
        //getPopular();
        navigation.canGoBack()

    }, [cleanup]);

    const handleSingOut = () => {
        auth.signOut()
            .then(() => {
                console.log("Home.Screen | btn-logOut, logged out and navigating to Initial Screen");
                navigation.replace("Initial");

            })
    }


    return (
        <SafeAreaView>
            <ScrollView>

                <View style={styles.container}>
                    {/* <View style={styles.topWrapper}>
                        <Text style={[styles.welcomeText, { fontFamily: 'Inter_400Regular' }]}>Seja Bem-vindo ao</Text>
                        <Text style={styles.welcomeText}>Moovie Plus.</Text>*/}




                    <View style={styles.slideView}>
                        <Carousel
                            style={styles.carousel}
                            ref={refCarousel}
                            data={listaPopular}
                            renderItem={_renderItem}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={380}
                            inactiveSlideOpacity={0.5}
                            loop={true}
                            loopClonesPerSide={2}
                            autoplay={true}
                            autoplayDelay={10}
                        />
                    </View>
                    <View style={{ borderRadius: 40, overflow: "hidden", backgroundColor: '#F54038', marginTop: 30, width: 300, alignSelf: 'center', marginTop: '80%' }}>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#1B2727')} onPress={handleSingOut}>

                            <View style={styles.button}>
                                <Text style={styles.buttonText}>LogOut</Text>
                            </View>

                        </TouchableNativeFeedback>
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
        height: 350,
        justifyContent: 'center',
        alignItems: 'center'
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
        alignSelf: 'center',
        width: '100%',
        height: 300,
        borderRadius: 12,
    },
    carouselText: {
        fontFamily: 'Inter_500Medium',
        color: '#ffff',
        fontSize: 24,
        padding: 15,
        textAlign: 'center'
    },
})
