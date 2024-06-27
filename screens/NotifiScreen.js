// src/screens/NotificationScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const NotificationScreen = () => {
  const notifications = [
    { id: 1, title: 'Vencimiento de almacén', message: 'Te ha enviado 1 mensaje', date: '12/6/2024' },
    { id: 2, title: 'PedroTorres', message: 'Te ha enviado 1 mensaje', date: '12/6/2024' },
    { id: 3, title: 'Vencimiento de almacén', message: 'Te ha enviado 1 mensaje', date: '12/6/2024' },
    { id: 4, title: 'PedroTorres', message: 'Te ha enviado 1 mensaje', date: '12/6/2024' },
    // Agrega más notificaciones aquí
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pemi-parts</Text>
        <Text style={styles.headerSubtitle}>Notificaciones</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Almacenes Temporales</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Almacenes Duraderos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Mensajes</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.card}>
            <View style={styles.cardIcon}>
              <Text style={styles.cardIconText}>Icon</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{notification.title}</Text>
              <Text style={styles.cardMessage}>{notification.message}</Text>
              <Text style={styles.cardDate}>{notification.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0056b3',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cardIconText: {
    color: '#007bff',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  cardMessage: {
    fontSize: 14,
    color: '#555555',
  },
  cardDate: {
    fontSize: 12,
    color: '#999999',
  },
});

export default NotificationScreen;
