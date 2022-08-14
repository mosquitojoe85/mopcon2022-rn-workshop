import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Button, Card, List, Appbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarCodeScanner } from "expo-barcode-scanner";
import Web3 from "web3";

const META_MASK_WALLET_PREFIX = "ethereum:";

const web3 = new Web3();
web3.setProvider(
  new web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/dea49333d33447559dbd2a21ef3f6cc2"
  )
);

const HomeScreen = (props) => {
  const [scanned, setScanned] = useState(false);
  const [state, setState] = useState({
    address: "",
    privateKey: "",
    isLoading: true,
    account: null,
    ETHBalance: null,
  });

  const { navigation } = props;

  const getETHBalance = async (address) => {
    const balance = await web3.eth.getBalance(address);
    const nextBalance = web3.utils.fromWei(balance, "ether");
    return Number(nextBalance).toFixed(3);
  };

  const checkWallet = async () => {
    const accountStr = await AsyncStorage.getItem("account");
    console.log(`accountStr--->`, accountStr);
    if (accountStr) {
      const account = JSON.parse(accountStr);
      const balance = await getETHBalance(account.address);

      setState({
        ...account,
        ETHBalance: balance,
        isLoading: false,
      });
    } else {
      navigation.replace("Welcome");
    }
  };

  const requestPermissionsAsync = async () => {
    await BarCodeScanner.requestPermissionsAsync();
  };

  const handleBarCodeScanned = ({ data }) => {
    const isMetaMaskWallet = data.indexOf(META_MASK_WALLET_PREFIX) > -1;

    const nextAddress = isMetaMaskWallet
      ? data.substring(META_MASK_WALLET_PREFIX.length)
      : data;

    setScanned(false);
    navigation.push("SendETH", { reciverAddress: nextAddress });
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
          <Text style={styles.balanceTextStyle}>{state.ETHBalance} ETH</Text>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#fff" />
      )}

      <Card>
        <Card.Actions>
          <View style={styles.rowStyle}>
            <View style={styles.columnStyle}>
              <Button
                icon="send"
                mode="outlined"
                onPress={() => {
                  navigation.navigate("SendETH");
                }}
              >
                Send
              </Button>
            </View>
            <View style={styles.columnStyle}>
              <Button
                icon="qrcode"
                mode="contained"
                onPress={() => {
                  navigation.navigate("Qrcode");
                }}
              >
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
        <Appbar.Header>
          <Appbar.BackAction onPress={() => setScanned(false)} />
          <Appbar.Content title="Title" />
        </Appbar.Header>
        <BarCodeScanner
          style={{ flex: 1 }}
          onBarCodeScanned={!scanned ? undefined : handleBarCodeScanned}
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
            navigation.replace("Welcome");
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