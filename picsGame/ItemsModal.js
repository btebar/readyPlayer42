import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './Styles';
import Objects from './Objects.json';

class ItemsModal extends React.Component {
    state = {
        items: [
            {
                label:'car',
                points: 30
            },{
                label: 'cup',
                points: 20,
            } , {
                label: 'shower',
                points: 10,
            }
        ]
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