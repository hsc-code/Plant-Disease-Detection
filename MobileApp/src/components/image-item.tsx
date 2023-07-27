import { Image, View,Text,StyleSheet } from 'react-native';
import { commonStyles } from '../utils/styles/common-styles';
import { LIST_ITEM_COLOR } from '../utils/constants/colors';

type ImageItemProps={
    imageData:{
        imageUrl:string;
        title:string;
    }
}

const ImageItem:React.FC<ImageItemProps> = ({ imageData }) => (
  <View style={styles.parentContainer}>
    <Image source={{ uri: imageData.imageUrl }} style={[commonStyles.image,styles.image]} resizeMode="cover" />
    <Text style={styles.text}>{imageData.title}</Text>
  </View>
);

const styles=StyleSheet.create({
  parentContainer:{ 
    flex: 1,
    margin:5,
    backgroundColor:LIST_ITEM_COLOR,
    padding:4,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:8 
  },
    image:{ 
    flex: 1,
    width:100,
    height:100 
  },
  text:{
    fontSize:16,
    fontWeight:'bold',
    color:'#ffffff'
  }
})

export default ImageItem