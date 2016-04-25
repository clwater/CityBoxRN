

var React = require('react-native');
var Dimensions = require('Dimensions');
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
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
 AsyncStorage,
 Navigator,

} = React;



var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var local_nv;






var Login = React.createClass({

 getInitialState:function(){
  return {
   username : '' ,
   password : '' ,
  };
 },
 usernameInput:function(text){
  this.setState({
    username:text,
  });
 },
 passwordInput:function(text){
  this.setState({
    password:text,
  });
 },
 componentDidMount: function () {
  //(this.stat.loginstatu);
 },




 render:function(){


  return(
   <View style={styles.back}>
     <View style={{flex:0.4}}/>
     <View style={styles.back1}>
      <View style={{flex:2 , flexDirection:'row' ,width:width}}>
       <View style={{flex:1}}></View>
       <View style={{flex:1}}>
       <Image source={{uri: 'https://raw.githubusercontent.com/clwater/ExternalFile/master/img/icon.png'}}
        resizeMode="contain"
        style={{height:width/3,width:width/3}}
        />
       </View>
       <View style={{flex:1}}></View>
      </View>
      <View style={{flex:1}}>
        <Text style={styles.APPTitle}>城院盒子</Text>
      </View>
     </View>
     <View style={styles.back2}>
      <ScrollView style={{flex:1 , width:width}}>
       <TextInput  style={styles.TextInput1}
        placeholder="学号" textAlign="center" autofocus="{true}" numberoflines="{1}"
        value={this.state.username} onChangeText={this.usernameInput}/>
       <TextInput  style={styles.TextInput1}
       placeholder="密码" textAlign="center" autofocus="{true}" numberoflines="{1}"
        value={this.state.password} secureTextEntry={true}
        onChangeText={this.passwordInput}/>
        <TouchableOpacity  style={styles.btn} onPress={this.login_btn}>
         <Text style={{  color:'#fff', fontSize:18}}>登录</Text>
        </TouchableOpacity>
       </ScrollView>

     </View>
     <View style={{flex:0.6}}/>
   </View>
  )
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


 login_btn: function(){

  //this.savelogininfo('201312026');


  //console.log(this.state.password);
  fetch('http://cityuit.sinaapp.com/login.php', {
   method: 'POST',
   // headers: {
   //     'Content-Type' : 'application/json;charset=UTF-8'
   //   },
    body:this.toQueryString({
    username :this.state.username,
    password :this.state.password,
   }),
  })
  .then(function(data){
    return data.text();
  })
  .then((responseText) => {
    //alert(responseText);
    //console.log(responseText);
    this.analysiclogin(responseText);
  })
  .catch((error) => {
    console.warn(error);
  });
 },

 savelogininfo:function(name){
  //console.log('=-=');
  console.log(this.state.username);
  AsyncStorage.setItem('loginstatu', 'true').done();
  AsyncStorage.setItem('loginname', name).done();
  AsyncStorage.setItem('loginid', this.state.username).done();
  AsyncStorage.setItem('loginpassword', this.state.password).done();
 },

  analysiclogin : function(json){
   var obj = JSON.parse(json);
   var status = obj.status;
   var name = obj.man;
   var im = obj.im;
   //console.log('01');
   //console.log(status);
   //console.log('02');
   //console.log(name);
   //console.log(im);



   if (status == 'ok') {
     Alert.alert(null,
            '登录成功',
            null
          ),
          //alert('1');
     this.savelogininfo(name);
      // alert('2');
   }else if(status == 'login failed'){
    Alert.alert(null,
           '帐号或密码错误',
           null
         )
   }else if(status == 'School network connection failure'){
    Alert.alert(null,
           '网路错误。',
           null
         )
   }
  },

});

var styles = StyleSheet.create({
 back:{
  flex:1,
  backgroundColor:'#434C5D',
  alignItems:'center',
  justifyContent:'center',
 },
 back1:{
  flex:1,
  width:width,
  alignItems:'center',
  justifyContent:'center',
  flexDirection:'column',
 },
 back2:{
  flex:1,
  alignItems:'center',
  width:width,
  justifyContent:'center',
 },
 APPTitle:{
  color:'#fff',
  fontSize:20,
 },
 TextInput1:{
  marginLeft:20,
  marginRight:20,
  backgroundColor:'#fff',
  borderRadius:10,
  height:40,
  marginTop:10,
  alignItems:'center',
  justifyContent:'center',
 },
 btn:{
  marginLeft:20,
  marginRight:20,
  marginTop:10,
  borderRadius:10,
  backgroundColor:'#3fb0ac',
  //'#c5d7a1',
  height:40,
  alignItems:'center',
  justifyContent:'center',
  width:width-40,
 },

});


module.exports = Login;
