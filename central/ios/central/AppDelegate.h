#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

#import "RNAppAuthAuthorizationFlowManager.h"

#import <UMCore/UMAppDelegateWrapper.h>
 
@interface AppDelegate : UMAppDelegateWrapper <UIApplicationDelegate, RCTBridgeDelegate,  RNAppAuthAuthorizationFlowManager>

@property (nonatomic, strong) UIWindow *window;

@property(nonatomic, weak)id<RNAppAuthAuthorizationFlowManagerDelegate>authorizationFlowManagerDelegate;

@end
