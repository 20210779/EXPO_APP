import React, { useState, useEffect, useCallback } from "react"; 
import fetchData from "../utils/fetchData"; 
import { View, Text, Image, TextInput, StyleSheet, RefreshControl } from 'react-native'; 
import * as Constantes from '../utils/constantes'; 
import { useFocusEffect } from '@react-navigation/native'; 
import Chip from '../components/chip/Chip'; 
import MessagesList from '../components/chatComponents/MessagesList'; 
import ContactsList from '../components/chatComponents/ContactsList';

// Componente principal de la pantalla de mensajes
export default function MessagesScreen({ navigation }) {
  // Estado para manejar la búsqueda, contactos, mensajes, pestaña seleccionada y refresco
  const [search, setSearch] = useState(''); 
  const [contacts, setContacts] = useState([]); 
  const [messages, setMessages] = useState([]); 
  const [selectedTab, setSelectedTab] = useState('messages'); 
  const [refreshing, setRefreshing] = useState(false); // Estado para manejar el refresco

  // Rutas a las APIs para usuarios y mensajes
  const USER_API = "services/admin/usuario.php"; 
  const CHAT_API = "services/admin/chat.php"; 
  const SERVER_URL = Constantes.IMAGES_URL; 

  // Función para obtener la lista de contactos
  const fetchContacts = async () => {
    try {
      const data = await fetchData(USER_API, 'readAll');
      if (data.status === 1) {
        // Mapea los datos de los contactos a un formato específico
        const registros = data.dataset.map((item) => ({
          contacto: `${item.nombre} ${item.apellido}`,
          usuario_receptor: item.id_usuario,
          mensaje: `Envia un mensaje a ${item.nombre} ${item.apellido}`,
          foto_receptor: `${SERVER_URL}usuarios/${item.imagen_usuario}`,
        }));
        setContacts(registros);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log('Error fetching contacts:', error);
    }
  };

  // Función para obtener la lista de mensajes recibidos
  const fetchFillMessages = async () => {
    try {
      const data = await fetchData(CHAT_API, 'readAllMessagesRecived');
      if (data.status === 1) {
        // Mapea los datos de los mensajes a un formato específico
        const registros = data.dataset.map((item) => ({
          usuario_emisor: item.nombre_emisor,
          usuario_receptor: item.nombre_receptor,
          id_usuario_receptor: item.id_usuario_receptor,
          id_usuario_emisor: item.id_usuario_emisor,
          mensaje: item.mensaje,
          foto_emisor: `${SERVER_URL}usuarios/${item.imagen_usuario_emisor}`,
          foto_receptor: `${SERVER_URL}usuarios/${item.imagen_usuario_receptor}`,
        }));
        setMessages(registros);
      } else {
        setMessages([]);
        console.log(data.error);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // UseEffect para cargar los contactos y mensajes al montar el componente
  useEffect(() => {
    fetchContacts(); 
    fetchFillMessages(); 
  }, []);

  // useFocusEffect para recargar contactos y mensajes al reenfocar la pantalla
  useFocusEffect(
    useCallback(() => {
      fetchContacts(); 
      fetchFillMessages(); 
    }, [])
  );

  // Función para refrescar la lista de contactos y mensajes
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Llama a ambas funciones de fetch y detiene el refresco después de completarlas
    Promise.all([fetchContacts(), fetchFillMessages()])
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo_carga.png')}
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
      <View style={styles.chipContainer}>
        <Chip
          label="Mensajes"
          selected={selectedTab === 'messages'}
          onPress={() => setSelectedTab('messages')}
        />
        <Chip
          label="Contactos"
          selected={selectedTab === 'contacts'}
          onPress={() => setSelectedTab('contacts')}
        />
      </View>

      {selectedTab === 'messages' ? (
        <MessagesList 
          data={messages} 
          navigation={navigation} 
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <ContactsList 
          contacts={contacts} 
          navigation={navigation}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
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
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
