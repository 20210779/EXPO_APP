// MessagesList.js
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, TextInput, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';

export default function MessagesList({ data, navigation, refreshControl }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.messageCard}
          onPress={() => navigation.navigate('ChatScreen', {
            id: item.id_usuario_emisor,
            name: item.usuario_emisor,
            image: item.foto_emisor
          })}
        >
          <Image source={{ uri: item.foto_emisor }} style={styles.profileImage} />
          <View style={styles.messageInfo}>
            <Text style={styles.name}>{item.usuario_emisor}</Text>
            <Text style={styles.message}>{item.mensaje}</Text>
          </View>
        </TouchableOpacity>
      )}
      refreshControl={refreshControl}
      style={styles.messageList}
    />
  );
}

const styles = StyleSheet.create({
  messageCard: {
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
  messageInfo: {
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