import React, { useState , useEffect} from 'react';
import fetchData from "../utils/fetchData";
import { View, Text, Image, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';


export default function MessagesScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState([]);


   // URL de la API para el usuario
   const USER_API = "services/admin/usuario.php";

   const fetchContacts = async () => {
    try {
      const data = await fetchData(USER_API, 'readAll'); 
      if (data.status === 1) {
        console.log(data);
        setContacts(data.dataset);  
      } else {
        console.log(data);
        console.error(data.error);
      }
    } catch (error) {
      console.log(error);
      console.error('Error en los contactos de fetch:', error);
    }
  };

  const filteredContacts = contacts.filter((contact) =>
  contact.nombre.toLowerCase().includes(search.toLowerCase())
);

  useEffect(() => {
    fetchContacts();
  }, []);

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
        data={filteredContacts}
        keyExtractor={(item) => item.id_usuario.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageCard}
            onPress={() => navigation.navigate('ChatScreen', { id: item.id_usuario, name: item.nombre, image: item.imagen_usuario  })}
          >
            <Image source={{ uri: item.imagen_usuario }}  style={styles.profileImage} />
            <View style={styles.messageInfo}>
              <Text style={styles.name}>{item.nombre} {item.apellido}</Text>
              <Text style={styles.message}>Último mensaje...</Text>
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
