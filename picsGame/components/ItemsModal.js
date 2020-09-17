import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './Styles';
import Objects from '../Objects.json';
import {Transition} from 'react-transition-group';

const transitionDuration = 500;
const transitionStyle = {
    entering: {opacity: 0.5},
    entered: {opacity: 1},
    exiting: {opacity: 0.5},
    exited: {opacity: 0}
};
const defaultStyle = {
    transition: `opacity 500ms ease-in-out`,
    opacity: 0,
};

class ItemsModal extends React.Component {
    state = {   
    }

    displayItems = () => {
        const seenObjects = this.props.seenObjects;
        const listItems = Objects.goalObjects.map((item, i) => {
            if (seenObjects && seenObjects.some((seenObj) => item.label == seenObj)) {
               return ( 
                <Text style={{...styles.itemsModalText, ...{textDecorationLine: 'line-through'}}} key={i}> 
                    {item.label} - {item.points} points
                </Text>
                );
            } else {
                return (
                <Text style={{...styles.itemsModalText}} key={i}> 
                    {item.label} - {item.points} points
                </Text>
                );
            }
        });
        return (
            listItems
        );
    }
    
    render() {
        return (
                
        <View style={{...styles.modal}}>
            <View style={{...styles.itemsColumn}}>
                {this.displayItems()}   
            </View>
            <View style={{...styles.buttonsRow}}>
                <TouchableOpacity
                    style={{...styles.closeButton, ...styles.genericButton}}
                    onPress={() => this.props.closeModal()}>
                    <Text style={{...styles.secondaryText }}> CLOSE </Text>
                </TouchableOpacity>
            </View>      
        </View>

               
        );
    }
}

export default ItemsModal;