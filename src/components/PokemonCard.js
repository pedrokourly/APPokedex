import React, { memo, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { capitalize, formatPokemonId } from '../utils/helpers';
import { useFavorites } from '../context/FavoritesContext';

const PokemonCard = ({ pokemon, onPress, id }) => {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const { isFavorite } = useFavorites();
  const isFav = isFavorite(id);
  
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ flex: 1, opacity: opacityAnim, transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.header}>
          <Text style={styles.idText}>{formatPokemonId(id)}</Text>
          {isFav && <Ionicons name="heart" size={16} color={colors.primary} />}
        </View>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image} 
          resizeMode="contain"
        />
        <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    margin: 8,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  idText: {
    color: colors.textLight,
    fontSize: 12,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
});

export default memo(PokemonCard);
