import React from 'react';
import { Modal, ScrollView, View, Text, TouchableOpacity,StyleSheet,Image } from 'react-native';
import type { outputData } from '../screens/home/disease-detector';
import { TITLE_COLOR,TEXT_COLOR } from '../utils/constants/colors';

type OutputModalProps={
    visible:boolean;
    onClose:()=>void;
    output:outputData | undefined
}

const OutputModal:React.FC<OutputModalProps> = ({ visible, onClose, output }) => {

   
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <ScrollView style={styles.scrollView}>
                <View style={styles.parentView}>
                    
                    <Text style={styles.title}>
                        {output?.title}🍂
                    </Text>                    
                    <Image source={{uri:output?.image_url}} style={styles.image} />
                    <View>
                    <View>
                        <Text>
                        {output?.pred === 3 ||
                        output?.pred === 5 ||
                        output?.pred === 7 ||
                        output?.pred === 11 ||
                        output?.pred === 15 ||
                        output?.pred === 18 ||
                        output?.pred === 20 ||
                        output?.pred === 23 ||
                        output?.pred === 24 ||
                        output?.pred === 25 ||
                        output?.pred === 28 ||
                        output?.pred === 38 ? (
                            <Text style={styles.subTitle}> Tips to Grow Healthy Plants :</Text>
                        ) : (
                            <Text style={styles.subTitle}>Brief Descritpion :</Text>
                        )}
                        </Text>
                        <Text style={styles.paragraph}>{output?.desc}</Text>
                    </View>

                    <View>
                        <Text>
                        {output?.pred === 3 ||
                        output?.pred === 5 ||
                        output?.pred === 7 ||
                        output?.pred === 11 ||
                        output?.pred === 15 ||
                        output?.pred === 18 ||
                        output?.pred === 20 ||
                        output?.pred === 23 ||
                        output?.pred === 24 ||
                        output?.pred === 25 ||
                        output?.pred === 28 ||
                        output?.pred === 38 ? (
                            <Text style={styles.subTitle}> Benefits :</Text>
                        ) : (
                            <Text style={styles.subTitle}>Prevent This Plant Disease By follow below steps :</Text>
                        )}
                        </Text>
                        <Text style={styles.paragraph}>{output?.prevention}</Text>
                    </View>
                    </View>

                    <Text>
                    {output?.pred !== 4 ? (
                        <>
                        <Text>
                            {output?.pred === 3 ||
                            output?.pred === 5 ||
                            output?.pred === 7 ||
                            output?.pred === 11 ||
                            output?.pred === 15 ||
                            output?.pred === 18 ||
                            output?.pred === 20 ||
                            output?.pred === 23 ||
                            output?.pred === 24 ||
                            output?.pred === 25 ||
                            output?.pred === 28 ||
                            output?.pred === 38 ? (
                            <Text style={styles.subTitle}> Fertilizer :</Text>
                            ) : (
                            <Text style={styles.subTitle}>Supplements :</Text>
                            )}
                        </Text>

                        <Text style={styles.paragraph}>{output?.sname}</Text>
                        </>
                    ) : (
                        <View></View>
                    )}
                    </Text>
                </View>
                
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles =StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    marginTop: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    marginVertical:8,
    color:TEXT_COLOR
  },
  title:{
    color:TITLE_COLOR,
    fontSize:20,
    fontWeight:'bold',
    marginVertical:4
  },
  image:{
    height:120,
    width:120,
    borderRadius:8,
    marginVertical:8
  },
  subTitle:{
    color:'#000',
    fontSize:18,
    marginVertical:2
  },
  parentView:{
    alignItems:'center',
    justifyContent:'center'
  }
});

export default OutputModal;
