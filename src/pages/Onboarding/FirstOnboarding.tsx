import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import mapCartoon from '../../images/mapCartoon.png'
import workers from '../../images/workers.png'
import animated from '../../images/animateWorkers.gif'

import LottieView from 'lottie-react-native';


const FirstOnboarding: React.FC = () => {
    const navigation = useNavigation();
    const imagesIntroduction = [animated, mapCartoon, workers]
    const textIntruduction = ["Seja Bem Vindo(a) ao BeJobber!", "Encontre o serviço que você precisa!", "Procure no mapa por profissionais próximos!"]
    const textSubIntruduction = ["Serviços fáceis de encontrar!", "Procure por profissionais próximo de você!", "Simples e prático!"]
    const [indexTutorial, setIndexTutorial] = useState(0)



    function handleNextImageTutorial() {
        if (indexTutorial === 2) {
            setIndexTutorial(0)
            navigation.navigate('SecondOnboarding')
        }
        setIndexTutorial(indexTutorial + 1)
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainerIntroduction}>
                <LottieView
                    source={require("../../assets/lotties/worker.json")}
                    loop
                    autoPlay
                    speed={1}
                    style={{ width: 300, height: 300 }}
                />
                {/* <Image source={imagesIntroduction[indexTutorial] ? imagesIntroduction[indexTutorial] : <View />} /> */}
            </View>
            <View style={styles.TextContainerIntroduction}>
                <Text style={styles.textIntroduction}>
                    {textIntruduction[indexTutorial]}
                </Text>
                <Text style={styles.textSubIntroduction}>
                    {textSubIntruduction[indexTutorial]}
                </Text>
            </View>
            <View style={styles.nextContainer}>
                <RectButton style={styles.nextButton} onPress={handleNextImageTutorial}>
                    <Feather name="arrow-right" color="#964EDE" size={30} />
                </RectButton>

            </View>
        </View>
    );
}

export default FirstOnboarding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBF2F5',
        justifyContent: 'space-around'
    },

    imageContainerIntroduction: {
        alignItems: 'center'
    },

    TextContainerIntroduction: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    textIntroduction: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#0089a5',
        fontSize: 36,
        textAlign: 'center',
        padding: 10,
    },

    textSubIntroduction: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#0089a5',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
    },

    nextContainer: {
        width: '100%',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    nextButton: {
        backgroundColor: '#CDFF42',
        borderRadius: 20,
        height: 56,
        width: '80%',

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        elevation: 3,
    },

    prevButton: {
        backgroundColor: '#0089A5',
        borderRadius: 20,
        height: 56,
        width: 54,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        elevation: 3,
    },
})