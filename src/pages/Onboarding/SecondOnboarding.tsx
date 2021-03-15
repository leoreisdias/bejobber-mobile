import React, { useContext, useState } from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

// import { Container } from './styles';
import firstTutorial from '../../images/FirstTutorial.png'
import secondTutorial from '../../images/SecondTutorial.png'
import { useNavigation } from '@react-navigation/native';
import { AccessContext } from '../../contexts/AccessContext';


const SecondOnboading: React.FC = () => {
    const { handleFirstVisit } = useContext(AccessContext);
    const navigation = useNavigation();

    const [indexTutorial, setIndexTutorial] = useState(0)
    const imagesTutorial = [firstTutorial, secondTutorial]
    const textTutorial = ["Digite um serviço e aperte para pesquisar", "Clique nas fotos e em seguida nos balões para ver o perfil completo"]

    function handleNextImageTutorial() {
        if (indexTutorial === 1) {
            setIndexTutorial(0);
            handleFirstVisit();
        }
        setIndexTutorial(indexTutorial + 1)
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={imagesTutorial[indexTutorial]} style={styles.firstImage}>
                <View>
                    <Text style={styles.tutorialText}>
                        {textTutorial[indexTutorial]}
                    </Text>
                </View>
                <View style={styles.nextContainer}>
                    <RectButton style={styles.nextButton} onPress={handleNextImageTutorial}>
                        <Feather name="arrow-right" color="#964EDE" size={30} />
                    </RectButton>
                </View>
            </ImageBackground>

        </View>
    );
}

export default SecondOnboading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    firstImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 20
    },

    tutorialText: {
        marginTop: 400,
        textAlign: 'center',
        fontFamily: 'Nunito_700Bold',
        fontSize: 26,
        color: '#E6F7FB',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
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
})