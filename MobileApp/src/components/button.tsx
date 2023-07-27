import React from 'react'
import {TouchableOpacity,Text,StyleSheet} from 'react-native'

type ButtonProps={
    title:string;
    onPress:()=>void,
    style?:Object;
    disabled?:boolean
}
const Button:React.FC<ButtonProps> = ({title,onPress,style,disabled}) => {
  return (
    <TouchableOpacity style={[styles.parentContainer,style]} onPress={onPress} disabled={disabled}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles=StyleSheet.create({
  parentContainer:{
    paddingVertical:12,
    width:'90%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:4
  },
  text:{color:'#000',fontWeight:'bold'}
})

export default Button