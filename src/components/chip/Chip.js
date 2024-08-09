import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Chip({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.selectedChip]}
      onPress={onPress}
    >
      <Text style={styles.chipText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#42a5f5',
    marginHorizontal: 5,
  },
  selectedChip: {
    backgroundColor: '#1e88e5',
  },
  chipText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
