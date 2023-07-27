import React,{useCallback} from 'react'
import { Text,FlatList } from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { commonStyles } from '../../utils/styles/common-styles';

import { data as contactData } from '../../utils/contact-data';
import ContactItem from '../../components/contact-item';
import { BACKGROUND_COLOR } from '../../utils/constants/colors';

export type contactDataType={
  name:string;
  email:string;
  github:string;
  linkedin:string;
}

const ContactScreen = () => {
  const renderItem=useCallback(({item}:{item:contactDataType})=>{
    return (
      <ContactItem data={item} />
    )
  },[])
  return (
    <SafeAreaProvider style={[commonStyles.parentContainer,{backgroundColor:BACKGROUND_COLOR,}]}>
      <Text style={commonStyles.titleText}>Our Team of Developers👨🏻‍💻</Text>
      <FlatList
        data={contactData}
        keyExtractor={item=>item.email}
        renderItem={renderItem}
      />
    </SafeAreaProvider>
  )
}

export default ContactScreen