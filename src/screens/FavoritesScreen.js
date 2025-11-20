import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import PokemonCard from '../components/PokemonCard';
import { colors } from '../theme/colors';

const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useFavorites();

  const handlePressPokemon = (pokemon) => {
    navigation.navigate('Details', { pokemonId: pokemon.id, pokemonName: pokemon.name });
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorites yet!</Text>
        <Text style={styles.subText}>Mark Pokémon as favorites to see them here.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PokemonCard 
            pokemon={item} 
            id={item.id}
            onPress={() => handlePressPokemon(item)}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },
});

export default FavoritesScreen;
