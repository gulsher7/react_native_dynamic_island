//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity,Keyboard, SafeAreaView,useColorScheme } from 'react-native';
import Video from 'react-native-video';

const { height, width } = Dimensions.get('window')

// https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8
// create a component
const VideoPlayeHLC = () => {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");


  const color = useColorScheme()

  const colorScheme = useColorScheme();



  const isDark = colorScheme == 'dark'


  const onPlayVideo = () =>{
    Keyboard.dismiss()
    setUrl(text)
  }

  const onReset = () =>{
    setText("")
    setUrl("")
  }
  return (
    <View style={{
      ...styles.container,
      backgroundColor: isDark ? 'rgba(0,0,0,0.9)' : 'white'
      
      }}>

      <SafeAreaView style={styles.mainView}>

        <TextInput
          value={text}
          
          placeholder='Paste or write your hsl video url'
          style={{
            height: 42,
            borderRadius: 8,
            backgroundColor: isDark ? 'rgba(255,255,255,0.4)': 'rgba(0,0,0,0.1)',
            width: width / 1.1,
            paddingHorizontal: 8,
            color: isDark ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,0.4)'
          }}
          onChangeText={value => setText(value)}
          placeholderTextColor={isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.4)'}
        />


        <View style={styles.btnView}>

          <TouchableOpacity
            onPress={onPlayVideo}
            style={styles.btnStyle}>
            <Text style={styles.textStyle}>Play Video</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onReset}
            style={styles.btnStyle}>
            <Text style={styles.textStyle}>Reset</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>


      {!!url? <Video
        controls={true}
        source={{
          uri: url,
        }}
        resizeMode={"stretch"}
        style={{
          backgroundColor: "black",
          height: height / 2,
        }}
        onError={(e) => console.log("error", e)}
      /> : null}

    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnView: {
    flexDirection: "row",
    alignItems: 'center',
    marginTop: 16,
    alignSelf: 'center'
  },
  btnStyle: {
    height: 42,
    borderRadius: 8,
    minWidth: 100,
    backgroundColor: "#0ba6ff",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold'
  },
  mainView: {
    margin: 16
  },
  backgroundVideo: {
    height: 200,
    width: 200,
    backgroundColor: "pink",
    flex: 1
  },
});

//make this component available to the app
export default VideoPlayeHLC;
