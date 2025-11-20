import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';
import { capitalize } from '../utils/helpers';

const TypeFilter = ({ types, selectedType, onSelectType }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={[
            styles.chip,
            !selectedType && styles.selectedChip,
            !selectedType && { backgroundColor: colors.text }
          ]}
          onPress={() => onSelectType(null)}
        >
          <Text style={[styles.text, !selectedType && styles.selectedText]}>All</Text>
        </TouchableOpacity>
        
        {types.map((type) => (
          <TouchableOpacity
            key={type.name}
            style={[
              styles.chip,
              selectedType === type.name && styles.selectedChip,
              selectedType === type.name && { backgroundColor: colors.types[type.name] || colors.text }
            ]}
            onPress={() => onSelectType(type.name)}
          >
            <Text style={[styles.text, selectedType === type.name && styles.selectedText]}>
              {capitalize(type.name)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    marginHorizontal: 4,
  },
  selectedChip: {
    // Background color is handled dynamically
  },
  text: {
    color: colors.text,
    fontWeight: '500',
  },
  selectedText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default TypeFilter;
