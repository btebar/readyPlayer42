import React from 'react';
import { View} from 'react-native';
import CameraView from './CameraView';
import config from './config';


class App extends React.Component {
  state = {
    objects: null
  }

  getObjectsInImage = async (imageBase64) => {
    // add loading: true so show spinner on screen while fetching results
    let results = await fetch(config.googleCloud.api + config.googleCloud.apiKey, {
        method: 'POST',
        body: JSON.stringify({
            "requests": [
                {
                    "image": {
                        "content": imageBase64
                    },
                    features: [
                        { type: "LABEL_DETECTION", maxResults: 10 },
                    ],
                }
            ]
        })
    });

    await results.json().then(results => {
        console.log(results)
        if (results) {
            this.setState({
                // add loading: false
                objects: results.responses[0].labelAnnotations
            })
        }
    }).catch((error) => {console.log(error)}); // print some meaningful error on screen
  }

  onSnapshot = async imageBase64 => {
    await this.getObjectsInImage(imageBase64);
    console.log(this.state.objects);

  }

  render() {
    return <CameraView onSnapshot={this.onSnapshot}/>;
  }
  
}

export default App;