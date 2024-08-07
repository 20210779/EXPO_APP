import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } from '@env';

export default function ChatScreen() {
  const [inputMessage, setInputMessage] = useState('');
  const [recipientNumber, setRecipientNumber] = useState('');

  const sendMessage = async () => {
    if (inputMessage.trim() === '' || recipientNumber.trim() === '') return;

    const apiUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

    const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64');

    try {
      const response = await axios.post(
        apiUrl,
        new URLSearchParams({
          To: recipientNumber,
          From: TWILIO_PHONE_NUMBER,
          Body: inputMessage,
        }).toString(),
        {
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      Alert.alert('Mensaje enviado', `Mensaje enviado a ${recipientNumber}`);
      setInputMessage('');
      setRecipientNumber('');
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      Alert.alert('Error', 'Ocurrió un error al enviar el mensaje. Verifica tu conexión y la configuración del servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Número de teléfono"
        value={recipientNumber}
        onChangeText={setRecipientNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Escribe un mensaje..."
        value={inputMessage}
        onChangeText={setInputMessage}
      />
      <Button title="Enviar" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});
