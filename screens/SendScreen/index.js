import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Feather";

const SendETHScreen = (props) => {
  const [state, setState] = useState({
    isLoading: true,
    account: null,
    ETHBalance: null,
    amount: "",
  });

  const setAmount = (nextAmount) => {
    setState({ ...state, amount: `${state.amount}${nextAmount}` });
  };

  const putPoint = () => {
    if (state.amount.split(".").length === 1)
      setState({ ...state, amount: `${state.amount}.` });
  };

  const deleteLastChar = () => {
    setState({
      ...state,
      amount: state.amount.substring(0, state.amount.length - 1),
    });
  };

  const handleSendETH = () => {
    console.log("發送 Eth");
  };

  const checkWallet = async () => {
    console.log("檢查錢包狀態");
  };

  useEffect(() => {
    checkWallet();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.availableBalanceTextStyle}>
        Available Balance: {state.ETHBalance} ETH
      </Text>
      <Text style={styles.amountTextStyle}>
        {state.amount.length ? state.amount : "0.000"} ETH
      </Text>

      <View style={styles.fullWidth}>
        <View style={styles.counterContainerStyle}>
          <TouchableOpacity
            onPress={() => setAmount("1")}
            style={styles.numberButtonStyle}
          >
            <Text style={styles.numberTextStyle}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAmount("2")}
            style={styles.numberButton2Style}
          >
            <Text style={styles.numberTextStyle}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAmount("3");
            }}
            style={styles.numberButtonStyle}
          >
            <Text style={styles.numberTextStyle}>3</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowFullWidthStyle}>
          <TouchableOpacity
            onPress={() => {
              setAmount("4");
            }}
            style={styles.numberButtonStyle}
          >
            <Text style={styles.numberTextStyle}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAmount("5");
            }}
            style={styles.numberButton2Style}
          >
            <Text style={styles.numberTextStyle}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAmount("6");
            }}
            style={styles.numberButtonStyle}
          >
            <Text style={styles.numberTextStyle}>6</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowFullWidthStyle}>
          <TouchableOpacity
            onPress={() => {
              setAmount("7");
            }}
            style={styles.numberButtonStyle}
          >
            <Text style={styles.numberTextStyle}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAmount("8")}
            style={styles.numberButton2Style}
          >
            <Text style={styles.numberTextStyle}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAmount("9")}
            style={styles.numberButtonStyle}
          >
            <Text style={styles.numberTextStyle}>9</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.numberWrapperStyle}>
          <TouchableOpacity onPress={putPoint} style={styles.numberButtonStyle}>
            <Text style={styles.numberTextStyle}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAmount("0");
            }}
            style={styles.numberButton2Style}
          >
            <Text style={styles.numberTextStyle}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={deleteLastChar}
            style={styles.numberButtonStyle}
          >
            <Icon style={styles.iconStyle} name="delete" color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSendETH}
        style={styles.sendEthContainerStyle}
      >
        <Text style={styles.sendEthTextStyle}>Send ETH</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fullWidth: { width: "100%" },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#0A0F24",
  },
  availableBalanceTextStyle: {
    textAlign: "center",
    color: "#E5BF30",
    fontSize: 20,
    position: "absolute",
    top: "10%",
  },
  sendEthContainerStyle: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#13182B",
    padding: 16,
    alignSelf: "center",
    marginTop: 10,
  },
  sendEthTextStyle: {
    color: "#E5BF30",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 20,
  },
  amountTextStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
    position: "absolute",
    top: "20%",
  },
  counterContainerStyle: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: "12%",
  },
  rowFullWidthStyle: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: "12%",
  },
  numberWrapperStyle: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: "12%",
  },
  numberButtonStyle: { width: "34%", marginHorizontal: 10, marginVertical: 15 },
  numberButton2Style: {
    width: "32%",
    marginHorizontal: 10,
    marginVertical: 15,
  },
  numberTextStyle: { color: "#fff", fontSize: 35, fontWeight: "400" },
  iconStyle: { fontSize: 30, position: "relative", top: 10 },
});

export default SendETHScreen;