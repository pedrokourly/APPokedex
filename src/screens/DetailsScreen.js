import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { getPokemonDetails } from '../api/pokeapi';
import { colors } from '../theme/colors';
import { capitalize, formatPokemonId } from '../utils/helpers';
import StatBar from '../components/StatBar';
import { useFavorites } from '../context/FavoritesContext';

const DetailsScreen = ({ route, navigation }) => {
  const { pokemonId, pokemonName } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [sound, setSound] = useState();

  const isFav = isFavorite(pokemonId);

  useEffect(() => {
    loadDetails();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [pokemonId]);

  const loadDetails = async () => {
    try {
      const data = await getPokemonDetails(pokemonId);
      setDetails(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load Pokémon details.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const playSound = async () => {
    try {
      if (details?.cries?.latest) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: details.cries.latest }
        );
        setSound(sound);
        await sound.playAsync();
      } else {
        Alert.alert('Info', 'No sound available for this Pokémon.');
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handleToggleFavorite = () => {
    if (!details) return;
    // Create a minimal pokemon object for the list
    const pokemonForList = {
      name: details.name,
      url: `https://pokeapi.co/api/v2/pokemon/${details.id}/`,
      id: details.id
    };
    toggleFavorite(pokemonForList);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!details) return null;

  const mainType = details.types[0].type.name;
  const backgroundColor = colors.types[mainType] || colors.primary;

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.name}>{capitalize(details.name)}</Text>
            <Text style={styles.id}>{formatPokemonId(details.id)}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity onPress={playSound} style={styles.actionButton}>
              <Ionicons name="volume-high" size={28} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleFavorite} style={styles.actionButton}>
              <Ionicons 
                name={isFav ? "heart" : "heart-outline"} 
                size={28} 
                color={colors.white} 
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.typesContainer}>
          {details.types.map((t) => (
            <View key={t.type.name} style={styles.typeBadge}>
              <Text style={styles.typeText}>{capitalize(t.type.name)}</Text>
            </View>
          ))}
        </View>
        <Image 
          source={{ uri: details.sprites.other['official-artwork'].front_default }} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: backgroundColor }]}>About</Text>
          <View style={styles.row}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Weight</Text>
              <Text style={styles.infoValue}>{details.weight / 10} kg</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Height</Text>
              <Text style={styles.infoValue}>{details.height / 10} m</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Abilities</Text>
              {details.abilities.map(a => (
                <Text key={a.ability.name} style={styles.abilityText}>
                  {capitalize(a.ability.name)}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: backgroundColor }]}>Base Stats</Text>
          {details.stats.map((s) => (
            <StatBar 
              key={s.stat.name}
              label={s.stat.name === 'special-attack' ? 'Sp. Atk' : s.stat.name === 'special-defense' ? 'Sp. Def' : s.stat.name}
              value={s.base_stat}
              color={backgroundColor}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  header: {
    padding: 20,
    paddingBottom: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  headerTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    marginTop: 40, // Add some margin for status bar
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 16,
    padding: 4,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
  },
  id: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  typesContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  typeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
  },
  typeText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: -40,
    zIndex: 2,
  },
  detailsCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
    minHeight: 500,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    color: colors.textLight,
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  abilityText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});

export default DetailsScreen;
