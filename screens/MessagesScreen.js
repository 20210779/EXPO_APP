import React, { useState } from 'react';
import { View, Text, Image, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const messages = [
  { id: '1', name: 'Gaby Campos', message: 'El almacén 2-B está a punto de...', image: require('../../assets/user1.png') },
  { id: '2', name: 'KennetLopez', message: 'El producto ha llegado bien al almac...', image: require('../../assets/user2.png') },
  { id: '3', name: 'Pemi-parts', message: 'Tu almacén 4-C está a punto de venc...', image: require('../../assets/logo_carga.png') },
  { id: '4', name: 'Pemi-parts', message: 'Tu almacén 5-A está a punto de venc...', image: require('../../assets/logo_carga.png') },
  { id: '5', name: 'KennetLopez', message: 'El producto ha llegado bien al almac...', image: require('../../assets/user2.png') },
  { id: '6', name: 'Pemi-parts', message: 'Tu almacén 1-C está a punto de venc...', image: require('../../assets/logo_carga.png') },
];

export default function MessagesScreen({ navigation }) {
  const [search, setSearch] = useState('');

  const filteredMessages = messages.filter((message) =>
    message.name.toLowerCase().includes(search.toLowerCase()) || message.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo_carga.png')} // Reemplaza con la ruta de tu logo
          style={styles.logo}
        />
        <Text style={styles.title}>Pemi-parts</Text>
        <Text style={styles.messagesTitle}>Mensajes</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageCard}
            onPress={() => navigation.navigate('ChatScreen', { name: item.name, message: item.message, image: item.image })}
          >
            <Image source={item.image} style={styles.profileImage} />
            <View style={styles.messageInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.messageList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#42a5f5',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#1e88e5',
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    marginLeft: 10,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  messagesTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  searchInput: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  messageList: {
    flex: 1,
  },
  messageCard: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#1e88e5',
  },
  footerIcon: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
});
