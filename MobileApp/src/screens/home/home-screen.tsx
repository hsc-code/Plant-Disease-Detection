import React from 'react'
import {Text,StyleSheet,ScrollView,View } from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { commonStyles } from '../../utils/styles/common-styles';
import { data as imageData } from '../../utils/image-data';
import ImageItem from '../../components/image-item';
import Button from '../../components/button';

import type {NavigationProp} from '@react-navigation/native'
import type { HomeStackParamList } from '../../navigator/home-navigator';
const HomeScreen = ({navigation}:{navigation:NavigationProp<HomeStackParamList>}) => {

  const buttonStyle={
    backgroundColor:'#00FF00',
    width:60,
    height:60,
    borderRadius:100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 16,
    position:'absolute',
    bottom:16,
    right:16}

  return (
    <SafeAreaProvider style={[commonStyles.parentContainer]}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <Text style={[commonStyles.titleText]}>🏵️ Plant Disease Detection 🏵️</Text>
        <Text style={[commonStyles.text,styles.description]}>Plant Disease Detection is necessary for every farmer so we are created Plant disease detection using Deep learning. In which we are using Convolutional Neural Network for classifying Leaf images into 39 Different Categories. The Convolutional Neural Code build in Pytorch Framework. For Training we are using Plant village dataset</Text>

        <View style={{ width:'90%' }}>
          {imageData.map((image, index) => {
            if (index % 2 === 0) {
              return (
                <View key={image.title} style={{ flexDirection: 'row' }}>
                  <ImageItem imageData={image} />
                  {index + 1 < imageData.length && (
                    <ImageItem imageData={imageData[index + 1]} />
                  )}
                </View>
              );
            }
            return null;
          })}
        </View>
      </ScrollView>
      <Button title='Try It !!' style={buttonStyle} onPress={()=>{navigation.navigate('DiseaseDetectorScreen')}} />
    </SafeAreaProvider>
  )
}

const styles=StyleSheet.create({
  scrollview:{
    alignItems:'center'
  },
  description:{
    color:'#000000',
    marginHorizontal:8,
    marginVertical:8
  }
})

export default HomeScreen