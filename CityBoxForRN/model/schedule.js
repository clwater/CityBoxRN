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



var Schedule = React.createClass({

 componentDidMount: function () {
   //alert('asd');
  },
 componentWillMount:function(){
  var d = new Date();
  //var str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
  //alert(str);

var start = new Date(2016,3,7);
var end = new Date(d.getFullYear(), d.getMonth()+1, d.getDate());
alert(parseInt((end-start) / (1000 * 60 * 60 * 24)));


 },

  getInitialState:function(){
   return {
    today_week : '1' ,
    schedule_week : '1',
   };
  },


 render:function(){
  return(
   <View style={styles.container}>
    <View style={styles.padtoptitle}></View>

    <View style={styles.title_view}>
     <View style={{flex:2 ,paddingLeft:10 ,alignItems:'center'}}>
      <Text style={styles.title}>课表</Text>
     </View>
     <View style={{flex:4}}/>
     <TouchableOpacity>
     <View style={[{flex:1 }, styles.update]}>
      <Text>更新</Text>
     </View>
     </TouchableOpacity>
    </View>

    <View style={styles.menu_view}>
    <TouchableOpacity>
      <View style={styles.re_today}>
       <Text>本周</Text>
      </View>
     </TouchableOpacity>
     <View style={{flex:1}}>
      <Text></Text>
     </View>

     <View style={{flex:1}}>
       <Text style={{color:'#FFF'}}>当前:</Text>
     </View>

     <View style={{flex:2}}>
     <Text style={{color:'#f1aa0b'}}>{this.state.today_week}</Text>
     </View>
     <View style={{flex:1}}>
     <Text style={{color:'#FFF'}}>课表:</Text>
     </View>
     <View style={{flex:2}}>
     <Text style={{color:'#c8c1df'}}>{this.state.schedule_week}</Text>
     </View>

    </View>

    <View style={styles.schedule_view} >
     <Text>main</Text>
    </View>

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
  flexDirection:'column',
 },
 title_view:{
  flex:1,
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'row',
  backgroundColor:'rgb(34,59,149)',
  width:width,
 },
 schedule_view:{
  flex:10,
  justifyContent:'center',
  alignItems:'center',
 },
 menu_view:{
  flex:1,
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'row',
  width:width,
  paddingLeft:5,
  backgroundColor:'#000'
 },
 title:{
  color:'#fff',
  fontSize:28,
 },
 padtoptitle:{
  height:height/20,
 },
 update:{
  borderRadius:5,
  padding:10,
  marginRight:10,
  backgroundColor:'#f5fcff',
  alignItems:'center',
  justifyContent:'center',
 },
 re_today:{
  flex:1,
  backgroundColor:'#fff' ,
  padding:5,
  alignItems:'center',
  justifyContent:'center',
  borderRadius:5,
 },
});


module.exports = Schedule;
