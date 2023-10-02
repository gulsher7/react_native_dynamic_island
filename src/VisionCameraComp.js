//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity,Dimensions } from 'react-native';
import VisionCamera from './VisionCamera/VisionCamera';
import { Camera } from 'react-native-vision-camera';

// create a component

const {width, height} = Dimensions.get('window')

const VisionCameraComp = () => {

  const [isAuthorized, setAuthorized] = useState<null | string>(null)
  const [openCamera, setOpenCamera] = useState(false)

  useEffect(()=>{
    (async()=>{
      const newCameraPermission = await Camera.requestCameraPermission()
      if(newCameraPermission == 'authorized'){
        setAuthorized(newCameraPermission)
      }
      console.log("newCameraPermission",newCameraPermission)
      const newMicrophonePermission = await Camera.requestMicrophonePermission()
    })();
  },[])

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>

      {!!openCamera ?<VisionCamera onBack={()=>setOpenCamera(false)} />: 
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity onPress={()=>setOpenCamera(true)} activeOpacity={0.7} style={styles.btnStyle}>
        <Text style={styles.textStyle}>View in AR</Text>
      </TouchableOpacity>
       </View>}
        {/* {!!isAuthorized ?<VisionCamera />:null} */}
      </SafeAreaView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnStyle: {
    minWidth: width/4,
    height: 42, 
    backgroundColor: '#800080',
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal: 8,
    borderRadius: 4
  },
  textStyle: {
    color: 'white',
    fontWeight:'500'
  }
});

//make this component available to the app
export default VisionCameraComp;
