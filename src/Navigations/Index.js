import React,{useState} from 'react';
import { TransitionPresets } from "@react-navigation/stack"
export const navigationRef = React.createRef();
export const defaultScreenOptions = {    
    cardStyle : {backgroundColor : 'white'},
    detachPreviousScreen: false,
    ...TransitionPresets.SlideFromRightIOS
}
export const ROUTES = {
    SPLASH : 'Splash',

    AUTH : {
        LOGIN : 'AuthStack',
        WALKTHROUGH: "WalkThroughsscreens"

   }, 
   DASHBOARD : {
    HOME : 'DrawerStack',}
}
export const changeStack = stackName => {
    resetRoot(stackName);
};
const resetRoot = routeName => {
    navigationRef.current?.resetRoot({
        index: 0,
        routes: [{ name: routeName }],
    });
};