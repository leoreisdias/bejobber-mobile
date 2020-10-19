import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TextInput, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Region } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { getCurrentPositionAsync, requestPermissionsAsync } from 'expo-location';
import api from '../services/api';
import { RectButton } from 'react-native-gesture-handler';



interface currentRegion {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}

// interface UserInterface{
//     _id: string,
//     location: {
//         coordinates: string[]
//     },
//     images: {
//         path: string
//     }[],
//     name: string,
//     bio: string,
//     services: string,
//     email: string,
//     phone: string,
//     city: string,
//     state: string,
// }



const BejobberMap: React.FC = () => {
    const [searchFlag, setSearchFlag] = useState(false);
    const [users, setUsers] = useState<any>([]);
    const [currentRegion, setCurrentRegion] = useState<currentRegion>();
    const [services, setServices] = useState("");

    const navigation = useNavigation();

    function handleNavigateToBejobberDetail(id: number) {
        navigation.navigate('BejobberDetail', { id })
    }

    function handleNavigateToMenu() {
        navigation.navigate('Landing');
    }

    useEffect(() => {
        async function loadInititalPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                });
            } else {
                alert('O Aplicativo precisa da sua localização para exibir o mapa, por favor, permita a localização do dispositivo');
                loadInititalPosition();
            }
        }
        loadInititalPosition();
    }, [])

    async function loadUsers() {
        setSearchFlag(true);
        const response = await api.get('/search', {
            params: {
                latitude: currentRegion?.latitude,
                longitude: currentRegion?.longitude,
                services,
            }
        });
        setUsers(response.data.users);
        setSearchFlag(false);
    }

    function handleRegionChange(region: Region) {
        setCurrentRegion(region);
    }

    if (!currentRegion) {
        return (
            <View style={styles.loadingSpinnerContainer}>
                <ActivityIndicator size="large" color="#0000ff" />

            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                onRegionChangeComplete={handleRegionChange}
                provider={PROVIDER_GOOGLE}
                style={!searchFlag ? styles.map : styles.mapLoading}
                initialRegion={currentRegion}
            >
                {users.map((user: any) => (
                    <Marker
                        key={user._id}
                        calloutAnchor={{
                            x: 4.2,
                            y: 1.15,
                        }}
                        coordinate={{
                            latitude: user.location?.coordinates[1],
                            longitude: user.location?.coordinates[0]
                        }}
                    >
                        <Image
                            style={styles.avatar}
                            source={{ uri: user.images[0]?.path }}
                        />
                        <Callout tooltip onPress={() => handleNavigateToBejobberDetail(user._id)}
                        >
                            <View style={styles.calloutContainer} >
                                <Text style={styles.calloutTextName} >{user.name.toUpperCase()}</Text>
                                <Text style={styles.calloutTextBio} >{user.bio}</Text>
                                <Text style={styles.calloutTextDetail} >Clique para detalhes</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>

            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar Jobbers por Serviços"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={services}
                    onChangeText={setServices}
                />

                <RectButton onPress={loadUsers} style={styles.loadButtom}>
                    <Text>
                        <Feather name={!searchFlag ? "search" : "loader"} size={20} color="#FFF" />
                    </Text>
                </RectButton>
            </View>

            <View style={styles.footer}>
                <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToMenu}>
                    <Text style={styles.footerText}>Menu</Text>
                    <Feather name="menu" size={20} color="#fff" />
                </RectButton>
            </View>
        </View>
    );
}

export default BejobberMap;

const styles = StyleSheet.create({
    loadingSpinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    mapLoading: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        opacity: 0.5
    },

    calloutContainer: {
        width: 260,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 5,
        justifyContent: 'flex-start',
    },

    calloutTextName: {
        color: '#0089a5',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold'
    },

    calloutTextBio: {
        color: '#999aaa',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold'
    },

    calloutTextDetail: {
        color: '#000',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold'
    },

    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 22,

        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',


    },


    footerText: {
        color: '#fff',
        fontFamily: 'Nunito_700Bold'
    },

    avatar: {
        width: 40,
        height: 40,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#FFF'
    },

    searchForm: {
        position: 'absolute',
        top: 40,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },
    loadButtom: {
        width: 50,
        height: 50,
        backgroundColor: '#661b6d',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },

    createOrphanageButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15c3d6',
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center'
    }



});
