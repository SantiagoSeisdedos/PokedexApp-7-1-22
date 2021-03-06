import React from 'react'
import { ActivityIndicator, FlatList, Image, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from '../theme/AppTheme';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { PokemonCard } from '../components/PokemonCard';
// import { pokemonApi } from '../api/pokemonApi';

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { simplePokemonList, loadPokemons } = usePokemonPaginated();

    return (
        <View>


            <Image
                source={require('../assets/pokebola.png')}
                style={styles.pokebolaBG}
            />


            <View
                style={{ alignItems: 'center' }}
            >



                <FlatList
                    data={simplePokemonList}
                    keyExtractor={(pokemon) => pokemon.id}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            top: top + 20,
                            marginBottom: top + 20,
                            paddingBottom: 10
                        }} >Pokedex </Text>
                    )}
                    renderItem={({ item }) => (<PokemonCard pokemon={item} />)}

                    // INFINITE SCROLL

                    onEndReached={loadPokemons}
                    onEndReachedThreshold={0.4}


                    ListFooterComponent={(
                        <ActivityIndicator
                            style={{ height: 100 }}
                            size={20}
                            color='grey'
                        />)}

                />

            </View>

        </View>
    )
}
