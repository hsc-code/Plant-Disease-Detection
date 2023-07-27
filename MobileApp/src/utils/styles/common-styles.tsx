import { StyleSheet } from "react-native";
import {BACKGROUND_COLOR,TEXT_COLOR,TITLE_COLOR } from "../constants/colors";

export const commonStyles=StyleSheet.create({
    parentContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:BACKGROUND_COLOR,
        paddingHorizontal:8
    },
    image:{
        borderRadius:4,
        marginVertical:2
    },
    text:{
        color:TEXT_COLOR,
        marginVertical:2,
    },
    titleText:{
        color:TITLE_COLOR,
        fontSize:24,
        fontWeight:'bold',
        marginVertical:8
    }
})