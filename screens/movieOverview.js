import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from 'react-native'


const movieOverview = ({ route: { params } }) => {

    const { filme } = params;

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
})