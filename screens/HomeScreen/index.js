import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Button, Card, List } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarCodeScanner } from "expo-barcode-scanner";

const HomeScreen = () => {
  const [scanned, setScanned] = useState(false);
  const [state, setState] = useState({
    address: "",
    privateKey: "",
    isLoading: true,
    account: null,
    ETHBalance: null,
  });

  const checkWallet = async () => {
    console.log("check Wallet status");
  };

  const requestPermissionsAsync = async () => {
    await BarCodeScanner.requestPermissionsAsync();
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(false);
  };

  useEffect(() => {
    checkWallet();
    requestPermissionsAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.addressTextStyle}>{state.address}</Text>

      {state.ETHBalance ? (
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <Text
            style={styles.balanceTextStyle}
          >
            {state.ETHBalance} ETH
          </Text>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#fff" />
      )}

      <Card>
        <Card.Actions>
          <View style={styles.rowStyle}>
            <View style={styles.columnStyle}>
              <Button icon="send" mode="outlined" onPress={() => false}>
                Send
              </Button>
            </View>
            <View style={styles.columnStyle}>
              <Button icon="qrcode" mode="contained" onPress={() => false}>
                Receive
              </Button>
            </View>
            <View style={styles.columnStyle}>
              <Button
                icon="camera"
                mode="contained"
                onPress={() => setScanned(true)}
              >
                QrCode Scanner
              </Button>
            </View>
          </View>
        </Card.Actions>
      </Card>
      <Modal visible={scanned}>
        <BarCodeScanner
          onBarCodeScanned={!scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </Modal>

      <List.Item
        title="Eth"
        description="Ethereum"
        left={(props) => (
          <Image
            {...props}
            style={styles.ethImageStyle}
            source={require("../../assets/eth.png")}
          />
        )}
        right={() => (
          <View style={styles.balanceListContainerStyle}>
            <Text> {state.ETHBalance} ETH </Text>
          </View>
        )}
      />
      <View style={{ marginTop: 64 }}>
        <Button
          mode="outlined"
          onPress={async () => {
            await AsyncStorage.removeItem("account");
          }}
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addressTextStyle: {
    fontSize: 18,
    color: "#8A8D97",
    top: 4,
    textAlign: "center",
    marginBottom: 10,
  },
  balanceTextStyle: {
    width: "100%",
    textAlign: "center",
    fontSize: 35,
    color: "#E5BF30",
    fontWeight: "bold",
  },
  rowStyle: { flex: 1, flexDirection: "row" },
  columnStyle: { flex: 1, margin: 10 },
  ethImageStyle: { width: 34, height: 57, marginLeft: 12 },
  balanceListContainerStyle: { flex: 1, justifyContent: "center" },
});

export default HomeScreen;