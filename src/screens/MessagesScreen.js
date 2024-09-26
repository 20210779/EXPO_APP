import React, { useState, useEffect, useCallback } from "react";
import fetchData from "../utils/fetchData";
import { View, Text, Image, TextInput, StyleSheet, RefreshControl, Dimensions, ScrollView } from 'react-native';
import * as Constantes from '../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';
import Chip from '../components/chip/Chip';
import MessagesList from '../components/chatComponents/MessagesList';
import ContactsList from '../components/chatComponents/ContactsList';
import { Searchbar } from 'react-native-paper';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
// Componente principal de la pantalla de mensajes
export default function MessagesScreen({ navigation }) {
  // Estado para manejar la búsqueda, contactos, mensajes, pestaña seleccionada y refresco
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedTab, setSelectedTab] = useState('messages');
  const [refreshing, setRefreshing] = useState(false); // Estado para manejar el refresco
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(false);
  //Constantes para la busqueda con el elemento de la libreria searchBar
  const onChangeSearch = (query) => setSearchQuery(query);

  // Rutas a las APIs para usuarios y mensajes
  const USER_API = "services/admin/usuario.php";
  const CHAT_API = "services/admin/chat.php";
  const SERVER_URL = Constantes.IMAGES_URL;

  // Función para obtener la lista de contactos
  const fetchContacts = async (searchForm = null) => {
    try {
      const action = searchForm ? "searchRows" : "readAll";
      const data = await fetchData(USER_API, action, searchForm);
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
        setContacts([]);
        console.log(data.error);
      }
    } catch (error) {
      console.log('Error fetching contacts:', error);
    }
  };

  // Función para obtener la lista de mensajes recibidos
  const fetchFillMessages = async (searchForm = null) => {
    try {
      const action = searchForm ? "searchRows" : "readAllMessagesRecived";
      const data = await fetchData(CHAT_API, action, searchForm);
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
      console.log('Error fetching messages:', error);
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


  useEffect(() => {
    if (searchQuery != "") {
      const formData = new FormData();
      formData.append("search", searchQuery);
      fetchContacts(formData);
      fetchFillMessages(formData);
    } else {
      fetchContacts();
      fetchFillMessages();
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo_carga.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Pemi-parts</Text>
      </View>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Busca aquí..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          placeholderTextColor='gray'
          style={styles.searchbar}
        />
      </View>
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

        messages.length > 0 && messages ? (
          <MessagesList
            data={messages}
            navigation={navigation}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../assets/find.png')} />
            <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15, maxWidth: 300 }}>No se encontraron resultados</Text>
          </View>
        )
      ) : (
        contacts.length > 0 && contacts ? (
          <ContactsList
            contacts={contacts}
            navigation={navigation}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../assets/find.png')} />
            <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15, maxWidth: 300 }}>No se encontraron resultados</Text>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003D74',
    paddingVertical: windowHeight * 0.05,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0D47A1',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
  messagesTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  searchbar: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    color: 'gray',
    maxHeight: windowHeight * 0.07,
    maxWidth: windowWidth * 1,
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
