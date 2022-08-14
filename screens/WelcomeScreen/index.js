import React, { useState } from "react";
import { StyleSheet, View, Modal } from "react-native";
import { Button, Appbar } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";

const WelcomeScreen = (props) => {
  const [scanned, setScanned] = useState(false);
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Modal visible={scanned} style={{flex: 1}}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => setScanned(false)} />
          <Appbar.Content title="Title" />
        </Appbar.Header>
        <BarCodeScanner
          style={{flex: 1}}
          onBarCodeScanned={() => setScanned(false)}
        />
      </Modal>
      <View style={{ margin: 10 }}>
        <Button icon="send" mode="outlined" onPress={() => {
          navigation.replace('Home');
        }}>
          Create Wallet
        </Button>
      </View>

      <View style={{ margin: 10 }}>
        <Button icon="send" mode="outlined" onPress={() => setScanned(true)}>
          Restore Wallet
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});

export default WelcomeScreen;