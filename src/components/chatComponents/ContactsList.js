// ContactsList.js
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, TextInput, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';

export default function ContactsList({ contacts, navigation, refreshControl }) {
  return (
    <FlatList
      data={contacts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.contactCard}
        onPress={() => navigation.navigate('ChatScreen', {
          id: item.usuario_receptor,
          name: item.contacto,
          image: item.foto_receptor
        })}>
          <Image source={{ uri: item.foto_receptor }} style={styles.profileImage} />
          <View style={styles.contactInfo}>
            <Text style={styles.name}>{item.contacto}</Text>
            <Text style={styles.message}>{item.mensaje}</Text>
          </View>
        </TouchableOpacity>
      )}
      refreshControl={refreshControl}
      style={styles.contactsList}
    />
  );
}

const styles = StyleSheet.create({
  contactCard: {
    flexDirection: 'row',
    padding: 12,
    margin: 2,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactInfo: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#555',
  },
});
