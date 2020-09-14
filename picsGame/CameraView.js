import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

class CameraView extends React.Component {
  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
    photo: null
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
  const {hasPermission, type, photo} = this.state;
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  var camera = null;
  return(
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => {
        camera = ref}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.3,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
                this.setState({type : type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
                });
            }}>
            <Text style={{ fontSize: 18, marginLeft:20, marginBottom: 40, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.3,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {this.snap(camera);}}>
            <Text style={{ fontSize: 18, marginRight:20, marginBottom: 40, color: 'white' }}> Snap </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
    }
}

export default CameraView;