//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DynamicIsland from './src/DynamicIsland';

// create a component
const App = () => {
  return (
    <View style={styles.container}>
        <DynamicIsland />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});

//make this component available to the app
export default App;
