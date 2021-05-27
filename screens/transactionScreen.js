import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Touchable } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class TransactionScreen extends Component{
  constructor(){
    super();
    this.state={
      hasCameraPermission:null,
      scanned:false,
      scannedData:"",
      buttonState:"normal" // to tell that whether the scan button has been clicked or not
    }
  }
  getCameraPermission= async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermission:status==='granted',
      scanned: false,
      buttonState:"clicked"
    })
  }
  handleBarCodeScanned=({type,data})=>{
    this.setState({
      scannedData:data,
      scanned: true, // the scanned data is recieved than need to set status true for scanned and get the button back to normal
      buttonState:"normal"
    })
  }
  render()
  {
    if(this.state.buttonState==="clicked" && this.state.hasCameraPermission)
    {
      return(
        // the handlebarCodeScanned function should be called only when scanned status is false
        <BarCodeScanner
          onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned  }
        />
      )
    }
    else if(this.state.buttonState==="normal"){
      return(
        /* if camera permission is true it need to display the data which is in scnned data document else show text as request for camera permission*/
        <View style={styles.container}>
          <Text>{this.state.hasCameraPermission=== true ? this.state.scannedData : 'Request for camera permission'}</Text>
          <TouchableOpacity style={styles.scannedButton} onPress={()=>{this.getCameraPermission()}}>
          <Text style={styles.displayText}>SCAN QR CODE</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDisplay:{
    fontSize:15,
    textDecorationColor:"underline"
  },
  scannedButton:{
    backgroundColor:"green",
    margin:10,
    padding:10
  }
});