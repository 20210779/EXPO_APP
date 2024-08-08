import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import * as RNRestart from 'react-native-restart';
import 'intl-pluralrules';

export default function HomeScreen() {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
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
            <View style={[styles.legendColor, { backgroundColor: '#66CCFF' }]} />
            <Text style={styles.legendText}>Fecha actual</Text>
          </View>
        </View>
      </View>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: '#00ccff',
          },
        }}
        theme={{
          selectedDayBackgroundColor: '#00ccff',
          todayTextColor: '#00ccff',
          arrowColor: '#00ccff',
          monthTextColor: '#00ccff',
          indicatorColor: '#00ccff',
        }}
        style={styles.calendar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90CAF9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1976D2',
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
    backgroundColor: '#2196F3',
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
  },
  calendar: {
    margin: 16,
    marginTop: 60,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#0066CC',
  },
  footerIcon: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
});
