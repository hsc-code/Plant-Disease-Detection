import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { BOTTOM_TAB_COLOR,TAB_ICON_COLOR,TAB_INACTIVE_COLOR } from "../utils/constants/colors";

import { HomeScreen,DiseaseDetectorScreen,ContactScreen } from "../screens/home";

export type HomeStackParamList={
    HomeScreen:undefined;
    DiseaseDetectorScreen:undefined;
}

type HomeTabParamList={
    HomeScreenTab:undefined;
    ContactScreen:undefined;
}

const Stack=createNativeStackNavigator<HomeStackParamList>();
const Tab=createBottomTabNavigator<HomeTabParamList>();


const HomeStackNavigator=()=>{
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="DiseaseDetectorScreen" component={DiseaseDetectorScreen} />
        </Stack.Navigator>
    )
}

type TabBarIconProps={
    focused: boolean;
    color: string;
    size: number;
}

const HomeTabIcon=(props:TabBarIconProps)=>{
    return (
        <Icon name="home" {...props}  />
    )
}

const ContactTabIcon=(props:TabBarIconProps)=>{
    return (
        <Icon name="user" {...props}  />
    )
}

export const HomeTabNavigator=()=>{
    return (
        <Tab.Navigator screenOptions={{
            
            headerShown: false,
            tabBarStyle: {
              backgroundColor: BOTTOM_TAB_COLOR,
              height: Platform.OS === 'android' ? 60 : 80,
              
            },
            tabBarItemStyle: {
              paddingVertical: Platform.OS === 'android' ? 8 : 0,
            },
            tabBarLabelStyle:{
                fontSize:12
            },
            tabBarActiveTintColor:TAB_ICON_COLOR,
            tabBarInactiveTintColor:TAB_INACTIVE_COLOR
          }}>
            <Tab.Screen name="HomeScreenTab" component={HomeStackNavigator} options={{tabBarLabel:'Home',tabBarIcon:HomeTabIcon}} />
            <Tab.Screen name="ContactScreen" component={ContactScreen} options={{tabBarLabel:'Contact',tabBarIcon:ContactTabIcon}} />
        </Tab.Navigator>
    )
}

