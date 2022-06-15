import React, { Component } from "react";
import { TextInput } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import db from '../config'


export default class SearchScreen extends Component {
  constructor(){
    super()
    this.state={allTransactions:[],
    searchText:'',
    lastVisibleTransaction:null
    }

  }

getTransactions=()=>{
  db.collection('transactions').get().then(snapshot=>{
    snapshot.docs.map(doc=>{
      this.setState({
        allTransactions:[...this.state.allTransactions,doc.data()]
      })
    })
  })
}

componentDidMount=()=>{
  this.getTransactions()
}

handelSearch=async(text)=>{
  var enteredText=text.toUpperCase().split('');
  text=text.toUpperCase()
  this.setState({allTransactions:[]})
  if(!text){
    this.getTransactions()
  }
  if(enteredText[0]==='B'){
    db.collection('transactions').where('book_id','==',text).get()
    .then(snapshot=>{
      snapshot.docs.map(doc=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastVisibleTransaction:doc
        })
      })
    })
  }

  else if(enteredText[0]==='S'){
    db.collection('transactions').where('student_id','==',text).get()
    .then(snapshot=>{
      snapshot.docs.map(doc=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastVisibleTransaction:doc
        })
      })
    })
  }
}


  render() {
    const {allTransactions,searchText}=this.state
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
<View style={styles.textinputContainer}>
<TextInput style={styles.textinput}
placeholder={'type here'}
placeholderTextColor={'#ffffff'}
onChangeText={text=>{this.setState({searchText:text})}}
>
</TextInput>
<TouchableOpacity style={styles.scanbutton}
onPress={()=>{this.handelSearch(searchText)}}
>
<Text style={styles.scanbuttonText}>
  Search
</Text>
</TouchableOpacity>
</View>
        </View>
        <View style={styles.lowerContainer}>
<FlatList 
data={allTransactions}
renderItem={this.renderItem}
keyExtracter={(item,index)=>{index.toString()}}
onEndReached={()=>{this.fetchMoreTransactions(searchText)}}
onEndReachedThreshold={0.7}
/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5653D4"
  },
  upperContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#9DFD24",
    borderColor: "#FFFFFF"
  },
  textinput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#5653D4",
    fontFamily: "Rajdhani_600SemiBold",
    color: "#FFFFFF"
  },
  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: "#9DFD24",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  scanbuttonText: {
    fontSize: 24,
    color: "#0A0101",
    fontFamily: "Rajdhani_600SemiBold"
  },
  lowerContainer: {
    flex: 0.8,
    backgroundColor: "#FFFFFF"
  },
  title: {
    fontSize: 20,
    fontFamily: "Rajdhani_600SemiBold"
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Rajdhani_600SemiBold"
  },
  lowerLeftContaiiner: {
    alignSelf: "flex-end",
    marginTop: -40
  },
  transactionContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  transactionText: {
    fontSize: 20,

    fontFamily: "Rajdhani_600SemiBold"
  },
  date: {
    fontSize: 12,
    fontFamily: "Rajdhani_600SemiBold",
    paddingTop: 5
  }
});