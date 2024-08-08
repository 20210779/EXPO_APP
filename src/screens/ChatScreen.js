import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Image, Button, FlatList } from 'react-native';
import fetchData from "../utils/fetchData";

const USER_API = "services/admin/usuario.php";

export default function ChatScreen({ route }) {
  const { id, name, image } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [dataUsuario, setDataUsuario] = useState(null); // Inicializar como null

  //Arreglo para el perfil
  const [profile, setProfile] = useState({
    id: " ",
    name: " ",
    fullname: " ",
    email: " ",
    phone: " ",
  });

  const verifyLogged = async () => {
    try {
      const data = await fetchData(USER_API, 'getUser');
      if (data.session) {
        console.log(data);
       
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const readProfile = async () => {
    try {
      const data = await fetchData(USER_API, "readProfile");
      const profileData = data.dataset;
      setProfile({
        id: profileData.id_usuario,
        name: profileData.nombre,
        fullname: profileData.apellido,
        email: profileData.correo_electronico,
        phone: profileData.numero_telefono,
      });

      console.log(data.dataset);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Petición hecha");
    }
  };

  

  const fetchMessages = async () => {
    if (!profile|| !profile.id) {
      Alert.alert('Error', 'ID de usuario no encontrado');
      return;
    }
    try {
      const data = await fetchData(USER_API, `getMessages&id_remitente=${dataUsuario.id_usuario}&id_destinatario=${id}`);
      if (data.status === 1) {
        setMessages(data.dataset);
      } else {
        console.error('Error 2:', data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!profile|| !profile.id) {
      Alert.alert('Error', 'ID de usuario no encontrado');
      return;
    }

    try {
      const response = await fetchData(USER_API, 'sendMessage'({
        envio_id: profile.id, // Asegúrate de que este valor no sea nulo
        recibido_id: id,
        descripcion: messageText,
      }));
      if (response.status === 1) {
        setMessageText('');
        fetchMessages(); // Refetch messages to include the newly sent message
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
  

  useEffect(() => {
    readProfile();
    verifyLogged();
  }, []);

  useEffect(() => {
    if (dataUsuario && dataUsuario.id_usuario) {
      fetchMessages(); // Solo fetch messages si dataUsuario está definido
    }
  }, [dataUsuario, id]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={image} style={styles.logo} />
        <Text style={styles.title}>{name}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id_mensaje.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{item.descripcion}</Text>
          </View>
        )}
        style={styles.messageList}
      />
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={messageText}
          onChangeText={setMessageText}
        />
        <Button title="Enviar" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#407BAF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2B5376',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
  },
  message: {
    fontSize: 16,
    color: '#000',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2B5376',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: '#fff',
  },
});
 