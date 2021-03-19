import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';

import mapMarkerImg from '../images/mapMarker.png';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import api from '../services/api';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import * as MailComposer from 'expo-mail-composer'


interface BejobberDetailRouteParams {
    id: number
}

interface Jobber {
    _id: string,
    name: string,
    phone: string,
    bio: string,
    images: {
        path: string
    }[],
    email: string,
    address: string,
    houseNumber: string,
    city: string,
    state: string,
    location: {
        coordinates: number[],
        _id: string,
        type: string
    },
    working_hours: string,
    work_on_weekends: boolean,
    services: string[]

}

export default function BejobberDetail() {
    const route = useRoute();
    const [jobber, setJobber] = useState<Jobber>()

    const params = route.params as BejobberDetailRouteParams;

    const message = `Ola ${jobber?.name}, lhe encontrei no BeJobber e estou interesso por um de seus serviços.`

    useEffect(() => {
        const loadUser = async () => {
            const response = await api.get(`users/${params.id}`)
            setJobber(response.data.users);
        }

        loadUser();
    }, [params.id])

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=55${jobber?.phone}&text=${message}`);
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `[BEJOBBER] - Interesse por serviço`,
            recipients: [String(jobber?.email)],
            body: message,
        })
    }

    function handleOpenGoogleMapsRoutes() {
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${jobber?.location.coordinates[1]},${jobber?.location.coordinates[0]}`)
    }

    if (!jobber) {
        return (
            <ShimmerPlaceHolder
                visible={true}
            >
                <Text></Text>
            </ShimmerPlaceHolder>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imagesContainer}>
                <ScrollView horizontal pagingEnabled>
                    {jobber.images.map(image => {
                        return (
                            <Image
                                key={image.path}
                                style={styles.image} source={{ uri: image.path }} />
                        )
                    })}

                </ScrollView>
                <View style={styles.imagesScrollWarning}>
                    <Text style={styles.imagesScrollWarningText}>Arraste para mais imagens</Text>
                    <Feather name="arrow-right" size={20} color="#000" />
                </View>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{jobber.name.charAt(0).toUpperCase() + jobber.name.slice(1)}</Text>
                <Text style={styles.description}>{jobber.bio.charAt(0).toUpperCase() + jobber.bio.slice(1)}</Text>
                <Text style={styles.subTitle}>Endereço:</Text>
                <Text style={styles.address}>{jobber.address}, {jobber.city}/{jobber.state}</Text>


                <View style={styles.mapContainer}>
                    <MapView
                        initialRegion={{
                            latitude: jobber.location?.coordinates[1],
                            longitude: jobber.location?.coordinates[0],
                            latitudeDelta: 0.008,
                            longitudeDelta: 0.008,
                        }}
                        zoomEnabled={false}
                        pitchEnabled={false}
                        scrollEnabled={false}
                        rotateEnabled={false}
                        style={styles.mapStyle}
                    >
                        <Marker
                            icon={mapMarkerImg}
                            coordinate={{
                                latitude: jobber.location?.coordinates[1],
                                longitude: jobber.location?.coordinates[0],
                            }}
                        />
                    </MapView>

                    <TouchableOpacity onPress={handleOpenGoogleMapsRoutes} style={styles.routesContainer}>
                        <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.separator} />

                <Text style={styles.title}>Serviços prestados</Text>
                <Text style={styles.description}>{jobber.services?.join(', ')}</Text>

                <View style={styles.scheduleContainer}>
                    <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
                        <Feather name="clock" size={40} color="#2AB5D1" />
                        <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>Segunda à Sexta {jobber.working_hours}</Text>
                    </View>
                    {jobber.work_on_weekends ? (
                        <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
                            <Feather name="info" size={40} color="#39CC83" />
                            <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos fim de semana</Text>
                        </View>
                    ) : (
                        <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
                            <Feather name="info" size={40} color="#FF669D" />
                            <Text style={[styles.scheduleText, styles.scheduleTextRed]}>Não Atendemos fim de semana</Text>
                        </View>
                    )}
                </View>

                <RectButton style={styles.contactButtonWhatsApp} onPress={sendWhatsapp}>
                    <FontAwesome name="whatsapp" size={24} color="#FFF" />
                    <Text style={styles.contactButtonText}>Entrar em contato</Text>
                </RectButton>

                <RectButton style={styles.contactButtonEmail} onPress={sendMail}>
                    <FontAwesome name="envelope" size={24} color="#FFF" />
                    <Text style={styles.contactButtonText}>Entrar em contato</Text>
                </RectButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    imagesContainer: {
        height: 240,
    },

    image: {
        width: Dimensions.get('window').width,
        height: 240,
        resizeMode: 'cover',
    },

    imagesScrollWarning: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

    imagesScrollWarningText: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#5c8599',
        lineHeight: 20,
    },

    detailsContainer: {
        padding: 24,
    },

    title: {
        color: '#4D6F80',
        fontSize: 30,
        fontFamily: 'Nunito_700Bold',
    },

    subTitle: {
        color: '#4D6F80',
        fontSize: 20,
        fontFamily: 'Nunito_700Bold',
        marginTop: 16
    },

    address: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#5c8599',
        lineHeight: 24,
    },

    description: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#5c8599',
        lineHeight: 24,
        marginTop: 16,
    },

    mapContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1.2,
        borderColor: '#B3DAE2',
        marginTop: 15,
        backgroundColor: '#E6F7FB',
    },

    mapStyle: {
        width: '100%',
        height: 150,
    },

    routesContainer: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    routesText: {
        fontFamily: 'Nunito_700Bold',
        color: '#0089a5'
    },

    separator: {
        height: 0.8,
        width: '100%',
        backgroundColor: '#D3E2E6',
        marginVertical: 40,
    },

    scheduleContainer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    scheduleItem: {
        width: '48%',
        padding: 20,
    },

    scheduleItemBlue: {
        backgroundColor: '#E6F7FB',
        borderWidth: 1,
        borderColor: '#B3DAE2',
        borderRadius: 20,
    },

    scheduleItemGreen: {
        backgroundColor: '#EDFFF6',
        borderWidth: 1,
        borderColor: '#A1E9C5',
        borderRadius: 20,
    },
    scheduleItemRed: {
        backgroundColor: '#FEF6F9',
        borderWidth: 1,
        borderColor: '#FFBCD4',
        borderRadius: 20,
    },

    scheduleText: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 20,
    },

    scheduleTextBlue: {
        color: '#5C8599'
    },

    scheduleTextGreen: {
        color: '#37C77F'
    },

    scheduleTextRed: {
        color: '#FF669D'
    },

    contactButtonWhatsApp: {
        backgroundColor: '#3CDC8C',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 40,
    },

    contactButtonEmail: {
        backgroundColor: '#FF669D',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 40,
    },

    contactButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        color: '#FFF',
        fontSize: 16,
        marginLeft: 16,
    }
})