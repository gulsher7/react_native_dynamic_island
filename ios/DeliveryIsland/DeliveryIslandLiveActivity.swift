//
//  DeliveryIslandLiveActivity.swift
//  DeliveryIsland
//
//  Created by Gulsher Khan on 02/10/23.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct DeliveryIslandAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var title: String
        var remainingTime: Int
        var totalTime: Int
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct DeliveryIslandLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: DeliveryIslandAttributes.self) { context in
            // Lock screen/banner UI goes here
          VStack(alignment: .leading, spacing: 10) {
              
              HStack{
                if context.state.remainingTime > 0 {
                  
                  Text("\(context.state.remainingTime) mins")
                  Text("left").foregroundStyle(.orange)
                            } else {
                              
                              HStack {
                                Text("Order Completed").foregroundStyle(.green).font(.system(size: 14))
                                Image(systemName: "checkmark.square.fill")
                                  .foregroundColor(.green)
                              }
                            }
                Image(systemName: "bicycle.circle.fill").foregroundColor(.orange)
              }.padding(10)
            

 
                
              VStack(alignment: .leading) {
                
                Text("\(context.state.title)").font(.system(size: 14)).lineLimit(2)
                
                ProgressView(value: 1.0 - (Double(context.state.remainingTime)/Double(context.state.totalTime))).padding(.top, 8).accentColor(.orange)
              }.padding(10)
      
            
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                  HStack {
                    
                    if context.state.remainingTime > 0 {
                      
                      Text("\(context.state.remainingTime) mins")
                      Text("left").foregroundStyle(.orange)
                                } else {
                                  
                                  HStack {
                                    Text("Order Completed").foregroundStyle(.green).font(.system(size: 14))
                                    Image(systemName: "checkmark.square.fill")
                                      .foregroundColor(.green)
                                  }
                                }
                  }
                }
                DynamicIslandExpandedRegion(.trailing) {
                  Image(systemName: "bicycle.circle.fill").foregroundColor(.orange)
                }
                DynamicIslandExpandedRegion(.bottom) {
                    
                  VStack(alignment: .leading) {
                    
                    Text("\(context.state.title)").font(.system(size: 14)).lineLimit(2)
                    
                    ProgressView(value: 1.0 - (Double(context.state.remainingTime)/Double(context.state.totalTime))).padding(.top, 8).accentColor(.orange)
                  }.padding(5)
          
                }
            } 
            // background state
            compactLeading: {
              
              Image(systemName: "bicycle.circle.fill")
                .foregroundColor(.orange)
              
            } compactTrailing: {
              
              Text("\(context.state.remainingTime)")
              
            } minimal: {
              Text("\(context.state.remainingTime)").foregroundStyle(.orange)
//                Text(context.state.title)
              
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension DeliveryIslandAttributes {
    fileprivate static var preview: DeliveryIslandAttributes {
        DeliveryIslandAttributes(name: "World")
    }
}

extension DeliveryIslandAttributes.ContentState {
    fileprivate static var smiley: DeliveryIslandAttributes.ContentState {
      DeliveryIslandAttributes.ContentState(title: "Your driver is on the way!", remainingTime: 4, totalTime: 17)
     }
     
     fileprivate static var starEyes: DeliveryIslandAttributes.ContentState {
       DeliveryIslandAttributes.ContentState(title: "Your driver is on the way!", remainingTime: 4, totalTime: 17)
     }
}


struct DeliveryIslandActivityWidget_Previews: PreviewProvider {
  
  static let activityAttributes = DeliveryIslandAttributes(name: "Gulsher")
  
  static let activityState = DeliveryIslandAttributes.ContentState(title: "Your driver is on the way!", remainingTime: 4, totalTime: 17)
  
  static var previews: some View {
      activityAttributes
          .previewContext(activityState, viewKind: .content)
          .previewDisplayName("Notification")
      
      activityAttributes
          .previewContext(activityState, viewKind: .dynamicIsland(.compact))
          .previewDisplayName("Compact")
      
      activityAttributes
          .previewContext(activityState, viewKind: .dynamicIsland(.expanded))
          .previewDisplayName("Expanded")
      
      activityAttributes
          .previewContext(activityState, viewKind: .dynamicIsland(.minimal))
          .previewDisplayName("Minimal")
  }
  
}
