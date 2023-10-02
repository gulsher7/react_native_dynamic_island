//
//  DeliveryIsland.m
//  video_react
//
//  Created by Gulsher Khan on 02/10/23.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(DeliveryIsland, NSObject)

RCT_EXTERN_METHOD(startActivity)
RCT_EXTERN_METHOD(updateActivity: (NSString *)name totalTime:(NSInteger)totalTime remainingTime:(NSInteger)remainingTime)
RCT_EXTERN_METHOD(stopActivity)
  

@end
