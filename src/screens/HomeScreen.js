import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPokemonList, getPokemonDetails, getTypes, getPokemonByType } from '../api/pokeapi';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import { colors } from '../theme/colors';
import { getPokemonIdFromUrl } from '../utils/helpers';

const HomeScreen = ({ navigation }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadTypes();
    loadPokemon();
  }, []);

  const loadTypes = async () => {
    try {
      const data = await getTypes();
      setTypes(data.results);
    } catch (error) {
      console.error('Error loading types:', error);
    }
  };

  const loadPokemon = async () => {
    if (loading || !hasMore || isSearching || selectedType) return;

    setLoading(true);
    try {
      const data = await getPokemonList(20, offset);
      setPokemonList(prev => [...prev, ...data.results]);
      setOffset(prev => prev + 20);
      if (!data.next) setHasMore(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to load Pokémon. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      resetList();
      return;
    }

    setLoading(true);
    setIsSearching(true);
    setSelectedType(null);
    
    try {
      const query = searchQuery.toLowerCase();
      const data = await getPokemonDetails(query);
      // Format single result to match list structure
      const formattedResult = {
        name: data.name,
        url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`
      };
      setPokemonList([formattedResult]);
      setHasMore(false);
    } catch (error) {
      setPokemonList([]);
      Alert.alert('Not Found', 'No Pokémon found with that name or number.');
    } finally {
      setLoading(false);
    }
  };

  const handleTypeSelect = async (type) => {
    setSelectedType(type);
    setSearchQuery('');
    setOffset(0);
    setHasMore(false); // Disable infinite scroll for filtered list for simplicity
    setIsSearching(false);

    if (!type) {
      resetList();
      return;
    }

    setLoading(true);
    try {
      const pokemons = await getPokemonByType(type);
      setPokemonList(pokemons);
    } catch (error) {
      Alert.alert('Error', 'Failed to load Pokémon by type.');
    } finally {
      setLoading(false);
    }
  };

  const resetList = () => {
    setPokemonList([]);
    setOffset(0);
    setHasMore(true);
    setIsSearching(false);
    setSelectedType(null);
    // Trigger reload
    // We need to reset state and then call loadPokemon, but loadPokemon depends on state.
    // A better way is to manually call the API here for the first page.
    setLoading(true);
    getPokemonList(20, 0).then(data => {
      setPokemonList(data.results);
      setOffset(20);
      setHasMore(!!data.next);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      Alert.alert('Error', 'Failed to load Pokémon.');
    });
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  };

  const handlePressPokemon = (pokemon) => {
    const id = getPokemonIdFromUrl(pokemon.url);
    navigation.navigate('Details', { pokemonId: id, pokemonName: pokemon.name });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SearchBar 
        value={searchQuery} 
        onChangeText={setSearchQuery} 
        onSubmit={handleSearch}
      />
      <TypeFilter 
        types={types} 
        selectedType={selectedType} 
        onSelectType={handleTypeSelect} 
      />
      
      {pokemonList.length === 0 && !loading ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No Pokémon found.</Text>
          {(isSearching || selectedType) && (
            <Text style={styles.retryText} onPress={resetList}>Clear filters</Text>
          )}
        </View>
      ) : (
        <FlatList
          data={pokemonList}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PokemonCard 
              pokemon={item} 
              id={getPokemonIdFromUrl(item.url)}
              onPress={() => handlePressPokemon(item)}
            />
          )}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          onEndReached={loadPokemon}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </SafeAreaView>
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
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: colors.textLight,
    marginBottom: 8,
  },
  retryText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
