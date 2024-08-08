import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button } from 'react-native';
import axios from 'axios';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } from '@env';

export default function ChatScreen({ route }) {
  const { name, message, image } = route.params;

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    setMessages(prevMessages => [...prevMessages, { text: inputMessage, fromUser: true }]);
    setInputMessage('');

    try {
      const apiUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

      const response = await axios.post(apiUrl, new URLSearchParams({
        Body: inputMessage,
        From: TWILIO_PHONE_NUMBER,
        To: '+50360126129', // Número de teléfono de destino
      }), {
        auth: {
          username: TWILIO_ACCOUNT_SID,
          password: TWILIO_AUTH_TOKEN
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });

      console.log('Respuesta de la API:', response.data);

      const botResponse = 'Message sent successfully';
      setMessages(prevMessages => [...prevMessages, { text: botResponse, fromUser: false }]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={image} style={styles.logo} />
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 600, backgroundColor: '#2B5376', padding: 15 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 16 }}
          placeholder="Escribe un mensaje..."
          value={inputMessage}
          onChangeText={setInputMessage}
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
