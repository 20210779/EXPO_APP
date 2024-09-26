import React from "react";
import { View, Text, Modal, TouchableOpacity, Image, Dimensions, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function NotificationModal({ modalVisible, setModalVisible, notificaciones }) {
  return (
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
              <Image style={styles.modalImage} source={require('../../../assets/logo_carga.png')} />
              <Text style={styles.modalTitle}>Detalle de la Notificación</Text>
            </View>
          </LinearGradient>
          <View style={styles.modalContent}>
            {notificaciones ? (
              <View style={{ marginVertical: 5, width: width * 0.85, marginHorizontal: height * 0.01 }}>
                <Text style={styles.modalText}>Título: {notificaciones.title}</Text>
                <Text style={styles.modalText}>{notificaciones.message}</Text>
                <Text style={styles.modalText}>Notificación de {notificaciones.type}</Text>
                <Text style={styles.modalText}>Fecha: {notificaciones.date}</Text>
              </View>
            ) : (
              <Text style={styles.modalText}>No hay detalles disponibles.</Text>
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
  );
}

const styles = StyleSheet.create({
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerModal: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  modalRow: { flexDirection: 'row', alignItems: 'center' },
  modalImage: { width: 40, height: 40, marginRight: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  modalContent: { alignItems: 'left' },
  modalText: { fontSize: 16, marginBottom: 20, maxWidth: width * 0.5 },
  closeButton: { backgroundColor: '#2196F3', padding: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center' },
  closeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
