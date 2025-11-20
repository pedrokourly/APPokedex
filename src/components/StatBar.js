import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { capitalize } from '../utils/helpers';

const StatBar = ({ label, value, color }) => {
  const percentage = Math.min(value / 255 * 100, 100); // Max stat is usually 255

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
      <Text style={styles.value}>{String(value).padStart(3, '0')}</Text>
      <View style={styles.barContainer}>
        <View 
          style={[
            styles.bar, 
            { width: `${percentage}%`, backgroundColor: color }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    width: 40,
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  value: {
    width: 30,
    fontSize: 12,
    color: colors.text,
    marginHorizontal: 8,
  },
  barContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 3,
  },
});

export default StatBar;
