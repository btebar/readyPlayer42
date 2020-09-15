import React from 'react';
import { View} from 'react-native';
import CameraView from './CameraView';
import config from './config';


class App extends React.Component {
  state = {
    objects: null
  }

  getObjectsInImage = async (imageBase64) => {
    // TODO: add loading: true so show spinner on screen while fetching results
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
                // TODO: add loading: false
                objects: results.responses[0].labelAnnotations
            })
        }
    // TODO: print some meaningful error on screen
    }).catch((error) => {console.log(error)}); 
  }

  onSnapshot = async imageBase64 => {
    await this.getObjectsInImage(imageBase64);
    var objects = this.state.objects;
    // Filter the objects returned by the api by score and keeps only 
    // the description
    let validatedResults = objects.filter((object) => object.score >= 0.7).map((object) => object.description);
    console.log(validatedResults);
  }

  render() {
    return <CameraView onSnapshot={this.onSnapshot}/>;
  }
  
}

export default App;