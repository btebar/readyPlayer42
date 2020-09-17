import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

let rank = 0;
const DATA = [
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    username: 'charlie',
    score: 10
   
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    username: 'alvaro',
    score: 9999999
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    username: 'adri',
    score: 1000
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    username: 'ana',
    score: 13
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    username: 'almu',
    score: 1563
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    username: 'willas',
    score: 1999
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    username: 'stan',
    score: 135
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    username: 'jorge',
    score: -500
  },
];

const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{++rank == 1 ? '🥇 ' : (rank == 2 ? '🥈 ' : (rank == 3 ? '🥉 ' : ' '+rank+'.  '))}{item.username}: {item.score} </Text>
  </View>
);

const App = () => {
  DATA.sort(function(a, b) {
    return (a.score > b.score) ? -1 : 1;
  })

  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.headerText}>Leaderboard</Text>
      </View>
       <View style={styles.container}>
           <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      </View>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#B6E0FF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
   header: {
    flex: 0.15,
    justifyContent: 'center',
    backgroundColor: '#FBFBFB',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 1,
    borderBottomColor: '#999999',
    borderBottomWidth: 0.3
  },
  headerText: {
    paddingTop: 30,
    fontSize: 30,
    color: '#330f53',
    textAlign: 'center',
    fontFamily: 'AvenirNext-Medium',
    fontWeight: 'bold'
  }
});


export default App;