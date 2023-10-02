//
//  DeliveryIsland.swift
//  video_react
//
//  Created by Gulsher Khan on 02/10/23.
//

import Foundation
import ActivityKit


@objc(DeliveryIsland)

class DeliveryIsland: NSObject {
  
  @objc func startActivity() {
    do {
       if #available(iOS 16.1, *){
         let foodDeliveryAttributes = DeliveryIslandAttributes(name: "Food Delivery")
         let foodDeliveryContentState = DeliveryIslandAttributes.ContentState(title: "Grub", remainingTime: 6, totalTime: 20)
         let activity = try Activity<DeliveryIslandAttributes>.request(attributes: foodDeliveryAttributes, contentState: foodDeliveryContentState, pushType: nil)
       }else{
         print("Dynamic Island and live activities not supported")
       }
     }catch(_){
       print("there is some error")
     }
  }
  
  @objc(updateActivity:totalTime:remainingTime:)
  func updateActivity(name: String, totalTime: Int, remainingTime: Int) {
 do{
      if #available(iOS 16.1, *){
        let foodDeliveryContentState = DeliveryIslandAttributes.ContentState(title: name, remainingTime: remainingTime, totalTime: totalTime)
        Task{
          for activity in Activity<DeliveryIslandAttributes>.activities {
            await activity.update(using: foodDeliveryContentState)
          }
        }
      }
    }catch(_){
      print("some error")
    }
  }
  
  @objc func stopActivity() {
    Task{
      for activity in Activity<DeliveryIslandAttributes>.activities {
        await activity.end()
      }
    }
  }
  
  
}
