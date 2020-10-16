import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import logoImg from '../images/Logo.png'

const Landing: React.FC = () => {
    return (
        <View style={styles.container}>
            <Image source={logoImg} style={styles.logoImg} />
            <TouchableOpacity style={styles.searchServiceButton}>
                <Text style={styles.searchServiceText}>Procurar Serviço</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signUpButton}>
                <Text style={styles.signUpText}>Cadastrar-se</Text>
            </TouchableOpacity>

        </View>
    );
}

export default Landing;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#6C54FF'
    },

    logoImg: {
        marginTop: 100,
        width: 200,
        height: 200,
    },

    searchServiceButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#15C3D6',
        borderRadius: 36,

        justifyContent: 'center',
        alignItems: 'center'
    },

    searchServiceText: {
        fontSize: 20,
        paddingBottom: 2,
        fontFamily: 'Nunito_700Bold',
        color: '#fff'
    },

    signUpButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#C683FB',
        borderRadius: 36,

        justifyContent: 'center',
        alignItems: 'center'
    },

    signUpText: {
        fontSize: 20,
        paddingBottom: 2,
        fontFamily: 'Nunito_700Bold',
        color: '#fff'
    }
})
