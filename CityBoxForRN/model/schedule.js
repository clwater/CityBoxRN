var React = require('react-native');
var Dimensions = require('Dimensions');
var ProgressBar = require('ProgressBarAndroid');
var {
 AppRegistry,
 StyleSheet,
 View,
 Text,
 PixeRatio,
 Image,
 TextInput,
 TouchableOpacity,
 ScrollView,
 Alert,
 SQL,
 Database,

} = React;


//var width = PixeRatio.get
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var local_nv;

var progressBar =
<View >
  <ProgressBar styleAttr="Inverse" />
</View>;

var Schedule = React.createClass({

 componentDidMount: function () {
   //alert('asd');
  },



 render:function(){
  return(
   <View style={styles.container}>
    <Text onPress={this.testsql} loadingView={progressBar}>schedule=-=</Text>
   </View>
  )
 },

});

var styles = StyleSheet.create({
 container:{
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#f5fcff',
  flex:1,
 },


});


module.exports = Schedule;
