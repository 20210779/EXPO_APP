import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, Modal, Button, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import 'intl-pluralrules';
import fetchData from "../utils/fetchData";
const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [almacenes, setAlmacenes] = useState([]);
  const [envios, setEnvios] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [eventoDetalle, setEventoDetalle] = useState([]);
  const CONTENEDOR_API = "services/admin/contenedor.php";
  const ENVIOS_API = "services/admin/cotizacion.php";

  // Función para marcar las fechas en el calendario (almacenes y envíos)
  const markCalendarDates = (items) => {
    const marked = { ...markedDates }; // Mantiene las fechas ya marcadas

    items.forEach((item) => {
      const color = item.envio ? '#8005fa' : '#004A8D';

      // Marcar fechas para almacenes
      if (item.fecha_inicio && item.fecha_caducidad) {
        marked[item.fecha_inicio] = {
          marked: true,
          dotColor: color,
          activeOpacity: 0,
        };
        marked[item.fecha_caducidad] = {
          marked: true,
          dotColor: color,
          activeOpacity: 0,
        };
      }

      // Marcar fechas para envíos (solo tiene una fecha estimada)
      if (item.fecha_estimada) {
        marked[item.fecha_estimada] = {
          marked: true,
          dotColor: color,
          activeOpacity: 0,
        };
      }
    });

    setMarkedDates(marked);
  };


  // Modificación en useEffect para combinar almacenes y envíos
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch almacenes y envíos en paralelo
        const [almacenesData, enviosData] = await Promise.all([fetchData(CONTENEDOR_API, 'readAll'), fetchData(ENVIOS_API, 'readAllCoti')]);

        // Procesar datos de almacenes
        const almacenesRegistros = almacenesData.status === 1 ? almacenesData.dataset.map((item) => ({
          almacen: `${item.nombre_almacenamiento}`,
          identificador: item.id_almacenamiento,
          fecha_inicio: item.tiempo_inicial,
          fecha_caducidad: item.tiempo_final,
        })) : [];

        // Procesar datos de envíos
        const enviosRegistros = enviosData.status === 1 ? enviosData.dataset.map((item) => ({
          envio: `envio número ${item.numero_seguimiento} con la etiqueta ${item.etiqueta_edificacion} del cliente: ${item.nombre_cliente} ${item.apellido_cliente}`,
          identificador: item.id_envio,
          estado: item.estado_envio,
          fecha_estimada: item.fecha_estimada,
        })) : [];

        // Combinar ambos registros
        const todosLosRegistros = [...almacenesRegistros, ...enviosRegistros];

        // Actualizar estado
        setAlmacenes(almacenesRegistros);
        setEnvios(enviosRegistros);

        // Marcar fechas en el calendario
        markCalendarDates(todosLosRegistros);

      } catch (error) {
        console.log('Error fetching data:', error);
        setAlmacenes([]);
        setEnvios([]);
      }
    };

    fetchAllData();
  }, []);



  // useFocusEffect para recargar contactos y mensajes al reenfocar la pantalla
  useFocusEffect(
    useCallback(() => {
      const fetchAllData = async () => {
        try {
          // Fetch almacenes y envíos en paralelo
          const [almacenesData, enviosData] = await Promise.all([fetchData(CONTENEDOR_API, 'readAll'), fetchData(ENVIOS_API, 'readAllCoti')]);

          // Procesar datos de almacenes
          const almacenesRegistros = almacenesData.status === 1 ? almacenesData.dataset.map((item) => ({
            almacen: `${item.nombre_almacenamiento}`,
            identificador: item.id_almacenamiento,
            fecha_inicio: item.tiempo_inicial,
            fecha_caducidad: item.tiempo_final,
          })) : [];

          // Procesar datos de envíos
          const enviosRegistros = enviosData.status === 1 ? enviosData.dataset.map((item) => ({
            envio: `envio número ${item.numero_seguimiento} con la etiqueta ${item.etiqueta_edificacion} del cliente: ${item.nombre_cliente} ${item.apellido_cliente}`,
            identificador: item.id_envio,
            estado: item.estado_envio,
            fecha_estimada: item.fecha_estimada,
          })) : [];

          // Combinar ambos registros
          const todosLosRegistros = [...almacenesRegistros, ...enviosRegistros];

          // Actualizar estado
          setAlmacenes(almacenesRegistros);
          setEnvios(enviosRegistros);

          // Marcar fechas en el calendario
          markCalendarDates(todosLosRegistros);

        } catch (error) {
          console.log('Error fetching data:', error);
          setAlmacenes([]);
          setEnvios([]);
        }
      };

      fetchAllData();
    }, [])
  );
  // Función para manejar la selección de un día
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);

    // Busca todos los eventos de almacenes y envíos que coinciden con la fecha seleccionada
    const eventosAlmacenes = almacenes.filter(
      (item) => item.fecha_inicio === day.dateString || item.fecha_caducidad === day.dateString
    );

    const eventosEnvios = envios.filter(
      (item) => item.fecha_estimada === day.dateString
    );

    // Mapea los mensajes de almacenes
    const mensajesAlmacenes = eventosAlmacenes.map(evento => {
      return day.dateString === evento.fecha_inicio
        ? `El ${evento.almacen} inició operaciones en esta fecha.`
        : `El ${evento.almacen} terminará operaciones en esta fecha.`;
    });

    // Mapea los mensajes de envíos
    const mensajesEnvios = eventosEnvios.map(envio => (
      `En esta fecha se espera el ${envio.envio}. Estado del envio: ${envio.estado}.`
    ));

    // Combina los mensajes de almacenes y envíos
    const mensajes = [...mensajesAlmacenes, ...mensajesEnvios];

    if (mensajes.length > 0) {
      setEventoDetalle(mensajes);  // Guarda la lista de mensajes
      setModalVisible(true);  // Muestra el modal
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo_carga.png')} // Reemplaza con la ruta de tu logo
          style={styles.logo}
        />
        <Text style={styles.title}>Pemi-parts</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Aquí está el calendario donde podrá ver las fechas ávidas y por a ver, que sean importantes sobre sus almacenes.
        </Text>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#004A8D' }]} />
            <Text style={styles.legendText}>Almacenes duraderos</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#3366CC' }]} />
            <Text style={styles.legendText}>Almacenes temporales</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#8005fa' }]} />
            <Text style={styles.legendText}>Envios</Text>
          </View>
          
        </View>
      </View>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: '#0D47A1',
          },
        }}
        theme={{
          selectedDayBackgroundColor: '#0D47A1',
          todayTextColor: '#0D47A1',
          arrowColor: '#0D47A1',
          monthTextColor: '#0D47A1',
          indicatorColor: '#0D47A1',
        }}
        style={styles.calendar}
      />
      {/* Modal para mostrar detalles del evento */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalCenter}>
          <View style={styles.modalContainer}>
            <LinearGradient colors={['#90CAF9', '#1976D2']} style={styles.headerModal}>
              <View style={styles.modalRow}>
                <Image style={styles.modalImage} source={require('../../assets/logo_carga.png')} />
                <Text style={styles.modalTitle}>Eventos del día</Text>
              </View>
            </LinearGradient>
            <View style={styles.modalContent}>
              {eventoDetalle.length > 0 ? (
                eventoDetalle.map((detalle, index) => (
                  <View key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                      width: width * 0.85, // Para alinear 2 en cada fila
                      marginHorizontal: height * 0.01 // Espacio entre los elementos
                    }}>
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: "#00ccff",
                        marginRight: 10,
                      }} />
                    <Text style={styles.modalText}>
                      {detalle}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.modalText}>No hay eventos para esta fecha.</Text>
              )}
            </View>
            <View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003D74',
    paddingVertical: height * 0.05,
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
  infoContainer: {
    padding: 16,
    backgroundColor: '#007bff',
  },
  infoText: {
    color: '#fff',
    marginBottom: 10,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    alignItems: 'center',
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: 5,
  },
  legendText: {
    color: '#fff',
    fontSize: 12,
    width: width * 0.15,
  },
  calendar: {
    margin: 16,
    marginTop: 60,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#0D47A1',
  },
  footerIcon: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    maxWidth: width * 0.65,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.8,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: height * 0.07,
    marginBottom: height * 0.13,
  },
  headerModal: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContent: {
    padding: 20,
  },
});
