import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './Styles';

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
        const listItems = this.state.items.map((item, i) =>
            <Text style={{...styles.itemsModalText}} key={i}> {item.label} - {item.points} points</Text>
        );
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