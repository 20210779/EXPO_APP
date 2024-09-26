// src/screens/NotificationScreen.js
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, RefreshControl, Modal, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AlertNotificationRoot } from "react-native-alert-notification";
import { FontAwesome, Entypo, MaterialIcons, Ionicons, Fontisto } from '@expo/vector-icons'; // Importa múltiples librerías de iconos
import fetchData from "../utils/fetchData";
import { LinearGradient } from 'expo-linear-gradient';
import Chip from '../components/chip/Chip';
import NotificationModal from "../components/Modals/NotificationModal";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const NotificationScreen = () => {
  const API = "services/admin/notificaciones.php";
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('messages');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Función para obtener las notificaciones
  const fetchNotifications = async (filterForm = null) => {
    try {
      const action = filterForm ? "filterNotis" : "readMyNotis";
      const data = await fetchData(API, action, filterForm);
      if (data.status === 1) {
        const registros = data.dataset.map((item) => ({
          title: item.titulo,
          id: item.id,
          message: item.mensaje,
          date: item.fecha,
          type: `${item.tipo}`,
          view: item.visto,
        }));
        setNotifications(registros);
      } else {
        console.log(data.error);
        setNotifications([]);
      }
    } catch (error) {
      console.log('Error fetching notifications:', error);
    } finally {
      console.log(notifications);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNotifications().finally(() => setRefreshing(false));
  }, []);


  useEffect(() => {
    if (selectedTab == "Almacenamiento" || selectedTab == "Envio"
      || selectedTab == "Chat" || selectedTab == "Cumpleaños"
      || selectedTab == "Sistema"
    ) {
      const formData = new FormData();
      formData.append("tipo", selectedTab);
      fetchNotifications(formData);
    } else {
      fetchNotifications();
    }
  }, [selectedTab]);

  // Función para obtener el ícono según el tipo de notificación
  const getIcon = (type) => {
    switch (type) {
      case 'Almacenamiento':
        return <MaterialIcons name="store" size={30} color="#007bff" />;
      case 'Envio':
        return <FontAwesome name="truck" size={30} color="#28a745" />;
      case 'Chat':
        return <Ionicons name="chatbubble-ellipses" size={30} color="#ffc107" />;
      case 'Cumpleaños':
        return <MaterialIcons name="event" size={30} color="#e83e8c" />;
      case 'Sistema':
        return <Entypo name="notification" size={30} color="#17a2b8" />;
      default:
        return <Entypo name="bell" size={30} color="#007bff" />;
    }
  };


  // Función para abrir el modal y marcar como vista la notificación
  const openNotification = async (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);

    // Aquí podrías hacer una petición a tu API para marcar la notificación como vista
    if (notification.view === "0") {
      const formData = new FormData();
      formData.append("id", notification.id);
      await fetchData(API, "markAsRead", formData);
      fetchNotifications();  // Refresca las notificaciones para reflejar el cambio
    }
  };

  return (
    <AlertNotificationRoot>
      <ScrollView style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <Image
            source={require('../../assets/logo_carga.png')} // Reemplaza con la ruta de tu logo
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>Pemi-parts</Text>
        </View>

        <View style={styles.chipContainer}>
          <Chip
            label="Todas"
            selected={selectedTab === 'Todas'}
            onPress={() => setSelectedTab('Todas')}
          />
          <Chip
            label="Almacenamiento"
            selected={selectedTab === 'Almacenamiento'}
            onPress={() => setSelectedTab('Almacenamiento')}
          />
          <Chip
            label="Envio"
            selected={selectedTab === 'Envio'}
            onPress={() => setSelectedTab('Envio')}
          />
        </View>
        <View style={styles.chipContainer}>
          <Chip
            label="Chat"
            selected={selectedTab === 'Chat'}
            onPress={() => setSelectedTab('Chat')}
          />
          <Chip
            label="Eventos"
            selected={selectedTab === 'Cumpleaños'}
            onPress={() => setSelectedTab('Cumpleaños')}
          />
          <Chip
            label="Sistema"
            selected={selectedTab === 'Sistema'}
            onPress={() => setSelectedTab('Sistema')}
          />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {notifications.length > 0 && notifications ? (
            notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.card,
                  { backgroundColor: notification.view === "0" ? '#ffffff' : '#dfdfdf' } // Color según el estado (visto o no)
                ]}
                onPress={() => openNotification(notification)}
              >
                <View style={styles.cardIcon}>
                  {getIcon(notification.type)}
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{notification.title}</Text>
                  <Text style={styles.cardMessage}>{notification.message}</Text>
                  <Text style={styles.cardDate}>{notification.date}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ height: 80, width: 80, marginBottom: 10 }} source={require('../../assets/find.png')} />
              <Text style={{ backgroundColor: '#e6ecf1', color: '#043998', padding: 20, borderRadius: 15, maxWidth: 300 }}>No se encontraron resultados</Text>
            </View>
          )}
          {selectedNotification && (
            <NotificationModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              notificaciones={selectedNotification}
            />
          )}
        </ScrollView>
      </ScrollView>
    </AlertNotificationRoot>
  );
};

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
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 16,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  cardMessage: {
    fontSize: 14,
    color: '#555555',
  },
  cardDate: {
    fontSize: 12,
    color: '#999999',
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
});

export default NotificationScreen;
