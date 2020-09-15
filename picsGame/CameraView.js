import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import styles from './Styles';
import AriaModal from 'react-aria-modal';
import ItemsModal from './ItemsModal';

class CameraView extends React.Component {
  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
    photo: null,
    isModalVisible: false,
  }

  renderBackdrop = () => {
    return (
      <div style={{...styles.backdrop}}>
      </div>
    )
  }

  componentDidMount = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasPermission: status === 'granted'});
  }


  snap = async (camera) => {
      if (camera) {
        const options = { quality: 0.5, base64: true };
        let newPhoto = await camera.takePictureAsync(options);
        this.setState({photo: newPhoto});
        this.props.onSnapshot(newPhoto.base64);
      }
  }

render() {   
  const {hasPermission, type, photo, isModalVisible} = this.state;
  console.log(isModalVisible);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  var camera = null;
  const modal = isModalVisible ? <ItemsModal closeModal={() => {this.setState({isModalVisible : false})}}></ItemsModal> : false;
  return(
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => {
        camera = ref}}>
          {modal}
        <View
          style={{...styles.buttonsRow}}>
          <TouchableOpacity
            style={{...styles.secondaryButton, ...styles.genericButton}}
            onPress={() => {
                this.setState({type : type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
                });
            }}>
            <Text style={{...styles.secondaryText }}> FLIP </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.primaryButton, ...styles.genericButton}}
            onPress={() => {this.snap(camera);}}>
            <Text style={{ ...styles.primaryText }}> SNAP </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.secondaryButton, ...styles.genericButton}}
            onPress={() => this.setState({isModalVisible: true})}>
            <Text style={{...styles.secondaryText }}> ITEMS </Text>
          </TouchableOpacity>
         
        </View> 
      </Camera>
     
      
    </View>
  );
    }
}

export default CameraView;