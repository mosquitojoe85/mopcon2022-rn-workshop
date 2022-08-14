import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import QRCode from "react-native-qrcode-svg";

const QRCodeScreen = () => {
  const [state, setState] = useState({
    isLoading: true,
    address: "test",
  });

  const checkWallet = async () => {
    console.log("檢查錢包狀態");
  };

  useEffect(() => {
    checkWallet();
  }, []);

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={{ marginTop: 64 }}>
        <Text style={styles.addressTextStyle}>Address: {state.address}</Text>
      </View>
      <View style={styles.qrcodeContainerStyle}>
        <QRCode
          size={200}
          color="#fff"
          backgroundColor="#0A0F24"
          value={state.address}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: "center",
  },
  addressTextStyle: {
    fontSize: 18,
    color: "#8A8D97",
    textAlign: "center",
    marginBottom: 10,
  },
  qrcodeContainerStyle: { marginTop: 200 },
});

export default QRCodeScreen;