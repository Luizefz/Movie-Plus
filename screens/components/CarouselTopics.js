import React, { useRef } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';


const carouselTopics = ({ title, lista }) => {

    const navigation = useNavigation();

    const refCarousel = useRef(null);

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Overview', {filme: item})}>
                    <Image style={styles.carouselImage} source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} />
                </TouchableOpacity>
            </View>
        )
    };

    return (
        <View>
            <Text style={styles.titleText}>{title}</Text>
            <Carousel
                style={styles.carousel}
                ref={refCarousel}
                data={lista}
                renderItem={_renderItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={120}
                activeSlideAlignment={'start'}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                
            />
        </View>
    )
}

export default carouselTopics

const styles = StyleSheet.create({
    titleText: {
        fontFamily: 'Inter_600SemiBold',
        color: '#ffff',
        fontSize: 20,
        paddingBottom: 10,
        paddingTop: 15
    },
    carouselImage: {
        width: 115,
        height: 160,
        borderRadius: 4,
    },
})
