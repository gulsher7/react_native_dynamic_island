//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

// create a component

// const {width, height} = Dimensions.get('window')

import { ImageZoom } from '@likashefqet/react-native-image-zoom';

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import imagePath from './imagePath';

const SIZE = 90;


type ContextType = {
  translateX: number;
  translateY: number;
};


const LoadingView = () => {


  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={'red'} />
    </View>
  )
}
const VisionCamera = (props: any) => {

  const { onBack = () => { } } = props
  const devices = useCameraDevices()
  const device = devices.back

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const [selectedImage, setSelectedImage] = useState(imagePath.image1)



  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    }
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });


  const imageData: any = [
    imagePath.image1,
    imagePath.image2,
    imagePath.image4,
    imagePath.image5,
    imagePath.image6,
    imagePath.image7,
    imagePath.image8,
    imagePath.image9,
  ]
  const renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={{ marginRight: 16 }}
        onPress={() => setSelectedImage(item)}
      >
        <Image
          source={item}

          style={{
            width: SIZE,
            height: SIZE,
          }}
        />
      </TouchableOpacity>
    )

  }

  if (device == null) return <LoadingView />

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>


      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />



      <View style={styles.circle}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>

          <Animated.View
            style={[styles.square, rStyle]}
          >

            <ImageZoom
              source={selectedImage}
              minScale={0.5}
              maxScale={3}
              onInteractionStart={() => console.log('Interaction started')}
              onInteractionEnd={() => console.log('Interaction ended')}
              onPinchStart={() => console.log('Pinch gesture started')}
              onPinchEnd={() => console.log('Pinch gesture ended')}
              onPanStart={() => console.log('Pan gesture started')}
              onPanEnd={() => console.log('Pan gesture ended')}
              resizeMode="contain"
              style={{
                width: 120,
                height: 120
              }}
            />

            {/* <Animated.Image
            source={selectedImage}
            style={{
              width: 120,
              height: 120,
            }}

          /> */}
          </Animated.View>

        </PanGestureHandler>
      </View>

      <TouchableOpacity onPress={onBack} style={styles.radius}>
        <Text>Back</Text>
      </TouchableOpacity>

      <View style={{
        position: 'absolute',
        bottom: 50,
        width: Dimensions.get('window').width
      }}>
        <FlatList
          horizontal
          data={imageData}
          renderItem={renderItem}
          keyExtractor={index => String(index)}
          ListHeaderComponent={() => <View style={{ paddingHorizontal: 8 }} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>

    </GestureHandlerRootView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',


  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: SIZE,
    width: SIZE,
    backgroundColor: '#b58df1',
    cursor: 'grab',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: 120,
    height: 120,
  },
  circle: {

    alignItems: 'center',
    top: Dimensions.get('window').height / 2.5
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "white",
    position: 'absolute',
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
    left: 10
  }
});

//make this component available to the app
export default VisionCamera;
