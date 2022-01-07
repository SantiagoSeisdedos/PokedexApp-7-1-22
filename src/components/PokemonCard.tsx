import React from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useState, useEffect, useRef } from 'react';

import ImageColors from 'react-native-image-colors'

import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useNavigation } from '@react-navigation/core';

const windowWidth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {

    const [bgColor, setBgColor] = useState('grey')
    const isMounted = useRef(true);
    const navigation = useNavigation();

    useEffect(() => {

        ImageColors.getColors(pokemon.picture, { fallback: 'grey' })
            .then(colors => {

                if (!isMounted.current) return;

                (colors.platform === 'android')
                    ? setBgColor(colors.dominant || 'grey')
                    : setBgColor(colors.background || 'grey')

            })

        return () => {
            isMounted.current = false;
        }

    }, [])

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={
                () => navigation.navigate('PokemonScreen', {
                    SimplePokemon: pokemon,
                    color: bgColor
                })
            }
        >

            <View style={{
                ...styles.cardContainer,
                width: windowWidth * 0.4,
                backgroundColor: bgColor,
            }} >

                {/* Nombre del pokemon y ID */}

                <View>
                    <Text style={styles.name} >
                        {pokemon.name}
                        {'\n#' + pokemon.id}
                    </Text>
                </View>


                <View style={styles.pokebolaContainer}>
                    <Image
                        source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokebola}
                    />
                </View>

                <FadeInImage
                    uri={pokemon.picture}
                    style={styles.pokemonImage}
                />


            </View>

        </TouchableOpacity>
    )
}


export const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        // backgroundColor: 'grey',
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        //SHADOW
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        //END-SHADOW

    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10,

    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: -25,
        right: -25,
        opacity: 0.5,

    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -8
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        overflow: 'hidden',
        opacity: 0.5,
        bottom: 0,
        right: 0,
    }
});
