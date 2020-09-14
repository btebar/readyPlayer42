
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //Alert(`QR code has been scanned!`);
    Linking.openURL(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject, styles.container}
    >
      <View style={styles.layerTop} />
      <View style={styles.layerCenter}>
        <View style={styles.layerLeft} />
        <View style={styles.focused} />
        <View style={styles.layerRight} />
      </View>
      <View style={styles.layerBottom} />
    </BarCodeScanner>
  );
}

const opacity = 'rgba(0, 0, 0, .8)';
const styles = StyleSheet.create({
  container: {
  flex: 1,
  flexDirection: 'column'
  },
  layerTop: {
  flex: 2,
  backgroundColor: opacity
  },
  layerBottom: {
  flex: 2,
  backgroundColor: opacity
  },
  layerCenter: {
  flex: 2,
  flexDirection: 'row'
  },
  layerLeft: {
  flex: 2,
  backgroundColor: opacity
  },
  layerRight: {
  flex: 2,
  backgroundColor: opacity
  },
  focused: {
  flex: 10
  }
}
);

//  {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}