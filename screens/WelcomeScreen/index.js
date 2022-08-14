import { useState, useEffect } from "react";
import { StyleSheet, View, Modal } from "react-native";
import { Button, Appbar } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
import Web3 from "web3";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const web3 = new Web3();
web3.setProvider(
  new web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/dea49333d33447559dbd2a21ef3f6cc2"
  )
);

const storeData = async (account) => {
  try {
    await AsyncStorage.setItem("account", JSON.stringify(account));
  } catch (error) {
    Alert.alert("Store Data Error", error.message, [
      { text: "OK", onPress: () => console.log() },
    ]);
  }
};

const createWallet = (navigation) => async () => {
  try {
    const {
      data: { data },
    } = await axios.get("https://wallet-2022-demo.passon.tw/wallets");
    storeData(data);
    navigation.replace("Home");
  } catch (error) {
    Alert.alert("Create Wallet Error", error.message, [
      { text: "OK", onPress: () => console.log() },
    ]);
  }
};

const restoreWallet = async (privateKey) => {
  const { address } = web3.eth.accounts.privateKeyToAccount(privateKey);
  const account = { address, privateKey };
  storeData(account);
};

const WelcomeScreen = (props) => {
  const [scanned, setScanned] = useState(false);
  const { navigation } = props;

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

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
        <Button icon="send" mode="outlined" onPress={createWallet(navigation)}>
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