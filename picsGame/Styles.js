import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = {
    genericButton: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 70,
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 15,
        flex:1,
        padding: 20,
    },
    primaryButton: {
        backgroundColor: '#6495ed',
    },
    secondaryButton: {
        backgroundColor: '#b0c4de',
        paddingLeft: 0,
        paddingRight: 0,
    },
    closeButton: {
        backgroundColor: '#8b0000',
        paddingLeft: 0,
        paddingRight: 0,
    },
    primaryText: {
        fontFamily: 'Hoefler Text',
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    secondaryText: {
        fontFamily: 'Hoefler Text',
        fontSize: 15,
        color: 'white'
    },
    buttonsRow: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    modal: {
        flex: 4,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 30,
        margin: 20,
        marginTop: 50
    },
    itemsColumn: {
        flex: 6,
        justifyContent:'center',
        flexDirection: 'column',
        alignItems:'center',
        paddingLeft: 20
    },
    itemsModalText: {
        fontSize: 20,
        fontFamily: 'Hoefler Text',
        color: '#6495ed',
        textAlign: 'left',
    }
}

export default styles;