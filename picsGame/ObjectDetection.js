import React from 'react';
import { View} from 'react-native';
import CameraView from './components/CameraView';
import config from './config';
import Objects from './Objects';


class ObjectDetection extends React.Component {
  state = {
    objects: null,
    points: 0,
    newPoints: 0
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

    let answer = await results.json().then(results => {
        console.log(results)
        if (results) {
            // this.setState({
            //     // TODO: add loading: false
            //     objects: results.responses[0].labelAnnotations
            // })
            return results.responses[0].labelAnnotations;
        }
    // TODO: print some meaningful error on screen
    }).catch((error) => {console.log(error)}); 
    return answer;
  }

  onSnapshot = async imageBase64 => {
  var newObjects = await this.getObjectsInImage(imageBase64);
  console.log(newObjects);
  //   var newObjects = [{
  //     description: 'Cup',
  //     score: 0.8
  //   },
  //   {
  //     description: 'Bottle',
  //     score: 0.8
  //   }, {
  //     description: 'Window',
  //     score: 0.9
  //   }
  // ]
    // Filter the objects returned by the api by score and keeps only 
    // the description
    let validatedResults = newObjects.filter((object) => object.score >= 0.7).map((object) => object.description);
    const {objects, points} = this.state;
    if (objects) {
      validatedResults = [...objects, ...validatedResults];
    }
    let newPoints = Objects.goalObjects.filter((obj) => validatedResults.some((res) => res == obj.label)).reduce((prev, next) => prev + next.points, 0);
    let difference = newPoints - points;
    this.setState({objects: validatedResults, points: newPoints, newPoints: difference});
    console.log(validatedResults);
  }

  render() {
    const {objects, points, newPoints} = this.state;
    return <CameraView onSnapshot={this.onSnapshot} objects={objects} points={points} newPoints={newPoints}/>;
  }
  
}

export default ObjectDetection;