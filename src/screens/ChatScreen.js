import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Button as BOTON,
} from 'react-native';
import fetchData from "../utils/fetchData";
import { useFocusEffect } from '@react-navigation/native';
import * as Constantes from '../utils/constantes';
import { AlertNotificationRoot } from "react-native-alert-notification";
import { DialogNotification, ToastNotification } from "../components/Alerts/AlertComponent";
import { Ionicons } from '@expo/vector-icons';
import { Button, Dialog, Paragraph, Portal, PaperProvider } from 'react-native-paper';
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';

const CHAT_API = "services/admin/chat.php";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function ChatScreen({ route }) {
  const { id, name, image } = route.params;
  console.log(`Parametros url ${id} ${name}`)
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const SERVER_URL = Constantes.IMAGES_URL;
  // Confirmar eliminación de registros
  const confirmarEliminacion = () => {
    deleteMessage(idToDelete);
    hideDeleteDialog();
  };

  const showDeleteDialog = (id) => {
    setIdToDelete(id);
    setDeleteDialogVisible(true);
  };
  const hideDeleteDialog = () => setDeleteDialogVisible(false);

  const fetchMessages = async () => {
    try {
      const form = new FormData();
      form.append('idChat', id);

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

      // Filtrar mensajes duplicados (cuando te envías a ti mismo)
      const filteredMessages = receivedMessages.filter(msg =>
        msg.id_usuario_emisor !== msg.id_usuario_receptor
      );

      // Combinar los mensajes filtrados y ordenarlos por fecha
      const combinedMessages = [...sentMessages, ...filteredMessages].sort(
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
    if (messageText === "") {
      ToastNotification(2, `Llene el campo para enviar un mensaje.`, true);
    } else {
      if (!id) {
        ToastNotification(2, `ID de usuario no encontrado.`, true);
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
          ToastNotification(2, `${response.error} ${response.exception}`, true);
        }
      } catch (error) {
        console.log('Error sending message:', error);
      }
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const form = new FormData();
      form.append('idChat', messageId);
      const response = await fetchData(CHAT_API, 'deleteRow', form);
      if (response.status === 1) {
        ToastNotification(1, `Mensaje eliminado correctamente.`, true);
        fetchMessages();
      } else {
        ToastNotification(2, `${response.error}`, true);
      }
    } catch (error) {
      console.log('Error deleting message:', error);
    }
  };
  useEffect(() => {
    // Definir un intervalo para recargar los mensajes cada X segundos
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 2000); // Recargar cada 5 segundos

    // Limpiar el intervalo cuando se salga de la pantalla
    return () => clearInterval(intervalId);
  }, [id]);


  useFocusEffect(
    useCallback(() => {
      fetchMessages();
    }, [id])
  );

  return (
    <AlertNotificationRoot>
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
                {item.isSender && (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => showDeleteDialog(item.id_chat)}>
                      <Ionicons name="trash" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
            style={styles.messageList}
          />
        )}
        <View>
          <LinearGradient
            style={styles.footer}
            colors={['#1976D2', '#42A5F5']}
          >
            <TextInput
              style={styles.input}
              placeholder="Escribe un mensaje..."
              value={messageText}
              onChangeText={setMessageText}
            />
            <TouchableOpacity onPress={sendMessage}>
              <Feather name="send" size={24} color="white" />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
      <Dialog visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
        <Dialog.Title>Confirmar Eliminación</Dialog.Title>
        <Dialog.Content>
          <Paragraph>¿Estás seguro de que deseas eliminar este comentario?</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDeleteDialog}>Cancelar</Button>
          <Button onPress={confirmarEliminacion}>Aceptar</Button>
        </Dialog.Actions>
      </Dialog>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003D74',
    paddingTop: windowHeight * 0.05,
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
    borderRadius: 50,
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
    marginVertical: 5,
    maxWidth: '80%',
    padding: 12,
    margin: 2,
    borderRadius: 5,
    backgroundColor: "white",
    elevation: 2,
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
    backgroundColor: '#007bff',
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
  buttonContainer: {
    marginTop: 5,
  },
  editButton: {
    color: 'white',
    backgroundColor: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
});
