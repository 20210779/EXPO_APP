import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Animated, Easing } from 'react-native';



export default function SplashScreen() {
    
  const [counter, setCounter] = useState(3);
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(prevCounter => prevCounter - 1);
    }, 1000);

    // Configura la animación de rotación
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    return () => clearInterval(timer);
  }, []);

  // Interpolación para convertir el valor de la animación en grados
  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View  style={styles.container}>
      <Animated.Image
        source={require('../../assets/logo_carga.png')}
        style={{ transform: [{ rotate }] }}
      />
      <Text style={styles.title}>
        Bienvenido a PemiParts
      </Text>
    </View>
  );

}

//Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004E92',
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFF',
  },
});
