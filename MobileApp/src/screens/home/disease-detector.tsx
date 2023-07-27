import React,{useState} from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {StyleSheet,Image,Text,ScrollView,Platform} from 'react-native'
import { commonStyles } from '../../utils/styles/common-styles'

import Button from '../../components/button'
import { BUTTON_COLOR } from '../../utils/constants/colors'

import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import OutputModal from '../../components/output-modal'


export type outputData={
  buy_link:string;
  desc:string;
  image_url:string;
  pred:number;
  prevention:string;
  simage:string;
  sname:string;
  title:string;
}

const DiseaseDetectorScreen = () => {
  const buttonStyle={
    backgroundColor:BUTTON_COLOR,
    marginVertical:8
  }


  const [selectedImage,setSelectedImage]=useState<ImageOrVideo>()
  const [output,setOutput]=useState<outputData>();


  const createFormData = (image:ImageOrVideo | undefined) => {
    
    const formData = new FormData();
    formData.append('file', {
      uri: image?.path,
      type: image?.mime,
      name: 'image.jpg',
    });
    return formData;
  };

  const openCamera=()=>{
    setOutput(undefined)
    ImagePicker.openCamera({
      width: 250,
      height: 250,
      cropping: false,
    }).then(image => {
      setSelectedImage(image)
    });
  }

  const openGallery=()=>{
    setOutput(undefined)
    ImagePicker.openPicker({
      multiple: false
    }).then(image => {
      setSelectedImage(image)
    });
  }

  const computeOutput=()=>{
    
    const formData = createFormData(selectedImage);
    fetch('http://127.0.0.1:5000/detectDisease', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setOutput(result)
      })
      .catch((error) => {
        console.log('Error occured!')
      });
  }
  return (
    <SafeAreaProvider style={[commonStyles.parentContainer,{paddingHorizontal:0}]}>
      <ScrollView contentContainerStyle={style.scrollview} showsVerticalScrollIndicator={false}>
        <Text style={[commonStyles.titleText]}>🏵️ Plant Disease Detector 🏵️</Text>
        <Image source={require('../../assets/images/plant.png')} style={[commonStyles.image,style.image]} />
        <Button title='Open Camera' onPress={openCamera} style={buttonStyle} />
        <Button title='Select from gallery' onPress={openGallery} style={buttonStyle} />
        {selectedImage?.path?
        <>
        <Image source={{uri:selectedImage.path}} style={[commonStyles.image,style.plantImage]} />
        <Text style={style.name}>{selectedImage.filename}</Text>
        <Button title='FIND DISEASE' onPress={computeOutput} style={buttonStyle} />
        </>
        :
        null}
      </ScrollView>
      <OutputModal visible={output!=undefined} onClose={()=>{setOutput(undefined)}} output={output} />
    </SafeAreaProvider>
  )
}

const style=StyleSheet.create({
  image:{
    width:180,
    height:180
  },
  plantImage:{
    width:250,
    height:250,
    borderRadius:8
  },
  scrollview:{
    alignItems:'center',
  },
  name:{
    marginBottom:8
  }
})

export default DiseaseDetectorScreen