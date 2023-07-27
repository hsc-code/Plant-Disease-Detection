import React from 'react'
import {View,Text,StyleSheet,Linking} from 'react-native'

import type { contactDataType } from '../screens/home/contact-screen'
import Icon from 'react-native-vector-icons/FontAwesome'

type ContactItemProps={
    data:contactDataType;
}
const ContactItem:React.FC<ContactItemProps> = ({data}) => {
  return (
    <View style={style.parentContainer}>
        <Text style={style.title}>{data.name}</Text>
        <View style={style.iconContainer}>
            <Icon name='envelope' color={'#121212'} size={24} onPress={()=>{Linking.openURL('mailto:'+data.email)}} />
            <Icon name='github' color={'#121212'} size={24} onPress={()=>{Linking.openURL(data.github)}} />
            <Icon name='linkedin' color={'#121212'} size={24} onPress={()=>{Linking.openURL(data.linkedin)}} />
        </View>
    </View>
  )
}

const style=StyleSheet.create({
    parentContainer:{
    backgroundColor:'#ffffff',
    padding:12,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:8,
    marginVertical:8
    },
    title:{
        color:'#121212',
        fontSize:24,
        fontWeight:'bold'
    },
    iconContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        width:'90%',
        marginVertical:8
    }
})

export default ContactItem