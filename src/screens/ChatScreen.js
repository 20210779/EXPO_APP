import React, { useState } from 'react';
import { View, Text, StyleSheet ,TextInput,Image,Button} from 'react-native';
import axios from 'axios';

export default function ChatScreen({ route }) {
  const { name, message, image } = route.params;

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    // Agregar mensaje del usuario a la lista de mensajes
    setMessages(prevMessages => [...prevMessages, { text: inputMessage, fromUser: true }]);
    setInputMessage('');

    try {
      // Reemplaza '192.122.176.73' con la IP de tu máquina
      const apiUrl = 'http://192.122.176.73:3001/message';
      console.log('Enviando mensaje a:', apiUrl);

      // Llamar a tu servidor API
      const response = await axios.post(apiUrl, { message: inputMessage });

      console.log('Respuesta de la API:', response.data);

      // Agregar respuesta del modelo a la lista de mensajes
      const botResponse = response.data.message; // Ajusta según la estructura de respuesta de tu API
      setMessages(prevMessages => [...prevMessages, { text: botResponse, fromUser: false }]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      // Manejo de errores (mostrar un mensaje de error o volver a intentar, según sea necesario)
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={image} // Reemplaza con la ruta de tu logo
          style={styles.logo}
        />
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.messageContent}>
      <Text style={styles.message}>{message}</Text>
      </View>
      {/* Entrada de mensaje */}
      <View style={{ flexDirection: 'row', alignItems: 'center' , marginTop:600, backgroundColor: '#2B5376', padding:15}}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 16 }}
          placeholder="Escribe un mensaje..."
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <Button title="Enviar" onPress={sendMessage} />
      </View>
      {/* Aquí puedes agregar más contenido relacionado con el chat */}
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
  loguito: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  messageContent: {
    fontSize: 14,
    color: '#fff',
    marginTop: 20,
    marginStart: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    paddingTop: 17,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#fff',
  },
});