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
 AsyncStorage,
} = React;

//var width = PixeRatio.get
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var local_nv;
var schedle = new Array();
var id ='';
var Schedule = React.createClass({
 componentDidMount: function () {
   //alert('asd');
  },
 componentWillMount:function(){
  this.getSchedule();
  var d = new Date();
  var start = new Date(2016,3,7);
  var end = new Date(d.getFullYear(), d.getMonth()+1, d.getDate());
  var week = parseInt((end-start) / (1000 * 60 * 60 * 24));
  this.state.today_week = parseInt((week / 7).toString());
  this.state.schedule_week=this.state.today_week;
 },

  getInitialState:function(){
   return {
    today_week : '1' ,
    schedule_week : '1',
    id:'',
    password:'',
   };
  },

  getSchedule:function(){
   for (var i = 0; i < 7; i++) {
    schedle[i] = new Array();
    for (var j = 0; j < 6; j++) {
     schedle[i][j] = i + "" + j;
    }
   }

   schedle[0][0] = "大学生就业与创业指导@教学楼301";

  },


  toQueryString:function (obj) {
      return obj ? Object.keys(obj).sort().map(function (key) {
          var val = obj[key];
          if (Array.isArray(val)) {
              return val.sort().map(function (val2) {
                  return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
              }).join('&');
          }

          return encodeURIComponent(key) + '=' + encodeURIComponent(val);
      }).join('&') : '';
  },


  getScheduleMeaasge:function(){
   alert('正在更新');
   //console.log("aaa");
   //获取本地存储的账号和密码

   AsyncStorage.getItem('loginid')
        .then((value) => {
         alert(value);
         this.state.password = value;
          }).catch().done();
   AsyncStorage.getItem('loginpassword')
        .then((value) => {
         alert(value);
            this.state.password = value;
          }).catch().done();



   fetch('http://120.27.53.146:5000/api/schedule', {
    method: 'POST',
    // headers: {
    //     'Content-Type' : 'application/json;charset=UTF-8'
    //   },
     body:this.toQueryString({
     username :'201312026',
     password :'221628',
     action : 'update',
    }),
   })
   .then(function(data){
     return data.text();
   })
   .then((responseText) => {
     //alert(responseText);
     console.log(responseText);

   })
   .catch((error) => {
     console.warn(error);
   });

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
     <View style={[{flex:1 }, styles.update]} >
      <Text style={{color:'#fff'}} onPress={this.getScheduleMeaasge}>更新</Text>
     </View>
     </TouchableOpacity>
    </View>

    <View style={styles.menu_view}>
    <TouchableOpacity>
      <View style={styles.re_today}>
       <Text style={{color:'#fff'}}>回到{'\n'}本周</Text>
      </View>
     </TouchableOpacity>
     <View style={{flex:1}}>
      <Text></Text>
     </View>

     <View style={{flex:1}}>
       <Text style={{color:'#FFF'}}>当前:</Text>
     </View>

     <View style={{flex:2}}>
     <Text style={{color:'#f1aa0b'}}>第{this.state.today_week}周</Text>
     </View>
     <View style={{flex:1}}>
     <Text style={{color:'#FFF'}}>课表:</Text>
     </View>
     <View style={{flex:2}}>
     <Text style={{color:'#c8c1df'}}>第{this.state.schedule_week}周</Text>
     </View>

    </View>

    <View style={styles.schedule_view} >

      <View style={styles.schedule_title}>
       <View style={{flex:0.5,alignItems:'center'}}/>
       <View style={{flex:1,alignItems:'center'}}><Text>周一</Text></View>
       <View style={{flex:1,alignItems:'center'}}><Text>周二</Text></View>
       <View style={{flex:1,alignItems:'center'}}><Text>周三</Text></View>
       <View style={{flex:1,alignItems:'center'}}><Text>周四</Text></View>
       <View style={{flex:1,alignItems:'center'}}><Text>周五</Text></View>
       <View style={{flex:1,alignItems:'center'}}><Text>周六</Text></View>
       <View style={{flex:1,alignItems:'center'}}><Text>周日</Text></View>
      </View>

      <View style={styles.schedule_body}>
       <View style={{flex:0.5,backgroundColor:'rgb(184,193,223)'}}>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:8}}>一</Text></View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:8}}>二</Text></View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:8}}>三</Text></View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:8}}>四</Text></View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:8}}>五</Text></View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:8}}>六</Text></View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:8}}>七</Text></View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:8}}>八</Text></View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:8}}>九</Text></View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:8}}>十</Text></View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:8}}>十一</Text></View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{fontSize:8}}>十二</Text></View>
       </View>
       <View style={{flex:1,alignItems:'center'}}>
        <Text style={styles.schedule_class}>{schedle[0][0]}</Text>
        <Text style={styles.schedule_class}>{schedle[0][1]}</Text>
        <Text style={styles.schedule_class}>{schedle[0][2]}</Text>
        <Text style={styles.schedule_class}>{schedle[0][3]}</Text>
        <Text style={styles.schedule_class}>{schedle[0][4]}</Text>
        <Text style={styles.schedule_class}>{schedle[0][5]}</Text>
       </View>
       <View style={{flex:1,alignItems:'center'}}>
        <Text style={styles.schedule_class}>{schedle[1][0]}</Text>
        <Text style={styles.schedule_class}>{schedle[1][1]}</Text>
        <Text style={styles.schedule_class}>{schedle[1][2]}</Text>
        <Text style={styles.schedule_class}>{schedle[1][3]}</Text>
        <Text style={styles.schedule_class}>{schedle[1][4]}</Text>
        <Text style={styles.schedule_class}>{schedle[1][5]}</Text>
       </View>
       <View style={{flex:1,alignItems:'center'}}>
        <Text style={styles.schedule_class}>{schedle[2][0]}</Text>
        <Text style={styles.schedule_class}>{schedle[2][1]}</Text>
        <Text style={styles.schedule_class}>{schedle[2][2]}</Text>
        <Text style={styles.schedule_class}>{schedle[2][3]}</Text>
        <Text style={styles.schedule_class}>{schedle[2][4]}</Text>
        <Text style={styles.schedule_class}>{schedle[2][5]}</Text>
       </View>
       <View style={{flex:1,alignItems:'center'}}>
        <Text style={styles.schedule_class}>{schedle[3][0]}</Text>
        <Text style={styles.schedule_class}>{schedle[3][1]}</Text>
        <Text style={styles.schedule_class}>{schedle[3][2]}</Text>
        <Text style={styles.schedule_class}>{schedle[3][3]}</Text>
        <Text style={styles.schedule_class}>{schedle[3][4]}</Text>
        <Text style={styles.schedule_class}>{schedle[3][5]}</Text>
       </View>
       <View style={{flex:1,alignItems:'center'}}>
        <Text style={styles.schedule_class}>{schedle[4][0]}</Text>
        <Text style={styles.schedule_class}>{schedle[4][1]}</Text>
        <Text style={styles.schedule_class}>{schedle[4][2]}</Text>
        <Text style={styles.schedule_class}>{schedle[4][3]}</Text>
        <Text style={styles.schedule_class}>{schedle[4][4]}</Text>
        <Text style={styles.schedule_class}>{schedle[4][5]}</Text>
       </View>
       <View style={{flex:1,alignItems:'center'}}>
        <Text style={styles.schedule_class}>{schedle[5][0]}</Text>
        <Text style={styles.schedule_class}>{schedle[5][1]}</Text>
        <Text style={styles.schedule_class}>{schedle[5][2]}</Text>
        <Text style={styles.schedule_class}>{schedle[5][3]}</Text>
        <Text style={styles.schedule_class}>{schedle[5][4]}</Text>
        <Text style={styles.schedule_class}>{schedle[5][5]}</Text>
       </View>
       <View style={{flex:1,alignItems:'center'}}>
        <Text style={styles.schedule_class}>{schedle[6][0]}</Text>
        <Text style={styles.schedule_class}>{schedle[6][1]}</Text>
        <Text style={styles.schedule_class}>{schedle[6][2]}</Text>
        <Text style={styles.schedule_class}>{schedle[6][3]}</Text>
        <Text style={styles.schedule_class}>{schedle[6][4]}</Text>
        <Text style={styles.schedule_class}>{schedle[6][5]}</Text>
       </View>
      </View>
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
  padding:10,
  marginRight:10,
  alignItems:'center',
  justifyContent:'center',
 },
 re_today:{
  flex:1,
  padding:5,
  alignItems:'center',
  justifyContent:'center',
  borderRadius:5,
 },
 schedule_title:{
  flexDirection:'row',
  backgroundColor:'rgb(184,193,223)',
  width:width,
  paddingTop:3,
  paddingBottom:3,
 },
 schedule_body:{
  flex:1,
  flexDirection:'row',
  width:width,
 },
 schedule_class:{
  width:width / 7.5 ,
  fontSize: 10 ,
  flex:1 ,
  paddingTop:5
 }
});


module.exports = Schedule;
