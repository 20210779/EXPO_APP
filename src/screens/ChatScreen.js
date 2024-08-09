import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  Button,
  FlatList,
  ActivityIndicator
} from 'react-native';
import fetchData from "../utils/fetchData";
import { useFocusEffect } from '@react-navigation/native';
import * as Constantes from '../utils/constantes';

const CHAT_API = "services/admin/chat.php";

export default function ChatScreen({ route }) {
  const { id, name, image } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(true);
  const SERVER_URL = Constantes.IMAGES_URL;

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append('idChat', id);

      // Simular un retraso de 1500 ms
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      await delay(1500);

      // Fetch mensajes enviados
      const sentData = await fetchData(CHAT_API, 'readAllMessagesSendsChat', form);
      const sentMessages = sentData.status === 1
        ? sentData.dataset.map(msg => ({ ...msg, isSender: true }))
        : [];

      // Fetch mensajes recibidos
      const receivedData = await fetchData(CHAT_API, 'readAllMessagesRecivedChat', form);
      const receivedMessages = receivedData.status === 1
        ? receivedData.dataset.map(msg => ({ ...msg, isSender: false }))
        : [];

      // Combinar ambos arrays y ordenarlos por fecha
      const combinedMessages = [...sentMessages, ...receivedMessages].sort(
        (a, b) => new Date(a.fecha) - new Date(b.fecha)
      );

      setMessages(combinedMessages);
    } catch (error) {
      console.log('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!id) {
      Alert.alert('Error', 'ID de usuario no encontrado');
      return;
    }
    try {
      const form = new FormData();
      form.append('idUsuario', id);
      form.append('mensaje', messageText);
      const response = await fetchData(CHAT_API, 'createRow', form);
      if (response.status === 1) {
        setMessageText('');
        fetchMessages(); // Refetch messages to include the newly sent message
      } else {
        alert(response.error);
      }
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };

  useEffect(() => {
    const fetchDataAndSetMessages = async () => {
      await fetchMessages();
    };

    fetchDataAndSetMessages();
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      fetchMessages();
    }, [id])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: image }} style={styles.logo} />
        <Text style={styles.title}>{name}</Text>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.isSender ? styles.messageSent : styles.messageReceived,
              ]}
            >
              <Image 
                source={{ uri: item.isSender ? `${SERVER_URL}usuarios/${item.imagen_usuario_emisor}` : image }} 
                style={styles.messageImage} 
              />
              <View>
                <Text style={styles.messageTitle}>{item.nombre_emisor}</Text>
                <Text style={styles.message}>{item.mensaje}</Text>
                <Text style={styles.date}>{new Date(item.fecha).toLocaleString()}</Text>
              </View>
            </View>
          )}
          style={styles.messageList}
        />
      )}
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: '80%',
  },
  messageTitle: {
    fontSize: 16,
    color: '#2B5376',
    maxWidth: 150,
  },
  message: {
    fontSize: 16,
    color: '#000',
    maxWidth: 100,
  },
  messageSent: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff', // Color morado para los mensajes enviados
  },
  messageReceived: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  messageImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  date: {
    fontSize: 12,
    color: '#666',
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
