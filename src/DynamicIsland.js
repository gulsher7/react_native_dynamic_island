//import liraries
import React, { useEffect, useState } from 'react';
import { Button, NativeModules, StyleSheet, View } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';


const {DeliveryIsland} = NativeModules

// create a component
const DynamicIsland = () => {


    const [timer, setTimer] = useState(40);

    useEffect(() => {
        const timeout = BackgroundTimer.setTimeout(() => {
            if (timer > 0) {
                setTimer(timer - 1)
                onUpdate(timer-1)
            }
        }, 1000);
        return () => {
            if (timeout) {
                BackgroundTimer.clearTimeout(timeout)
            }
        }
    }, [timer])

    const onStart = () =>{
        DeliveryIsland.startActivity()
        setTimer(40)
    }

    function getZomatoDriverStatus(value) {
        switch (true) {
          case value < 0:
            return "Invalid input. Please provide a non-negative value.";
          case value === 0:
            return "Thank you for using Grub! Your driver has completed the delivery successfully.";
          case value > 0 && value <= 10:
            return "Your Grub driver has arrived at your doorstep with your order. Enjoy your meal!";
          case value > 10 && value <= 20:
            return "Great news! Your Grub driver is just a few minutes away from delivering your delicious meal.";
          case value > 20 && value <= 30:
            return "Your Grub driver has picked up your order and is on the way to your delivery address.";
          case value > 30 && value <= 40:
            return "Your Grub driver is en route to the restaurant for your order pickup.";
          default:
            return "Value exceeds the maximum limit (40). Please provide a valid input.";
        }
      }
      

    const onUpdate = (remaningTime) =>{
        DeliveryIsland.updateActivity(
            getZomatoDriverStatus(remaningTime),
            40,
            remaningTime
        )
    }

    const onEnd = () =>{
        DeliveryIsland.stopActivity()
    }

    return (
        <View style={styles.container}>
            <Button
                title="Start Activity"
                onPress={onStart}

            />
            <Button
                title="Update Activity"
                      onPress={()=>onUpdate(timer)}
            />
            <Button
                title="End Activity"
                onPress={onEnd}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});


export default DynamicIsland;
