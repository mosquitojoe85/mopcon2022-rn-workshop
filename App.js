import { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timmer = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);
    return () => clearInterval(timmer);
  }, []);
  return (
    <View style={[styles.bg]}>
      <View style={{ height: 100 }}>
        <Text style={count < 5 ? styles.less : styles.greater}>You clicked {count} times</Text>
      </View>
      <View style={{ height: 100 }}>
        <TouchableOpacity style={styles.button} onPress={() => setCount(count+1)}>
          <Text style={styles.buttonText}>Click</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex:1, paddingTop: 150, alignItems: 'center' },
  less: { fontSize: 25, color: '#4d3398', fontWeight: 'bold' },
  greater: { fontSize: 25, color: '#f3845c', fontWeight: 'bold' },
  button: {
    width: 150,
    height: 50,
    alignItems: 'center',
    paddingTop: 10,
    borderRadius: 10,
    backgroundColor: '#3498db'
  },
  buttonText: {
    fontSize: 25,
    color: '#fff'
  }
});