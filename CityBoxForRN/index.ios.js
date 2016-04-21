var React = require('react-native');
var Login = require('./model/login');
var Schedule = require('./model/schedule');
var Dimensions = require('Dimensions');
var TimerMixin = require('react-timer-mixin');
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

var {
　　AppRegistry,
　　View,
　　Navigator,
　　Text,
　　StyleSheet,
   AsyncStorage,
} = React ;

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var local_nv;

var loginpd = false;
//登陆页面
var LoginView = React.createClass({
 mixins: [TimerMixin],
 componentDidMount: function() {
   this.setTimeout(
     () => {
      AsyncStorage.getItem('loginstatu')
           .then((value) => {
               this.setState({loginstatu: value});
               if(this.state.loginstatu == 'tru'){
                 if(loginpd === false){
                this.props.navigator.push({name: 'main'});
                loginpd = true;
               }
               }else {
                this.componentDidMount();
               }
             }).catch().done();
    },
     100
   );
 },
    render() {
        return (
            <View style={styles.container} >
             <Login/>
            </View>
        )
    },
});


//应用主页面
var mainpd = false;
var MainView = React.createClass({
 getInitialState:function(){
  return {
   loginstatu : '' ,
  };
 },


 componentDidMount: function () {

   AsyncStorage.getItem('loginstatu')
        .then((value) => {
            this.setState({loginstatu: value});
            if(this.state.loginstatu == 'tru'){
             //登陆成功
            }else {
             //alert('no');
             this.props.navigator.push({name: 'login'});
            }
          }).catch().done();
  },
     render:function() {
          return (
              <Schedule></Schedule>
          )
    },
});

var App = React.createClass({

 configureScene(route){
   return Navigator.SceneConfigs.FadeAndroid;
 },

 renderScene(router, navigator){
   var Component = null;
   this._navigator = navigator;


   switch(router.name){
     case "login":
       Component = LoginView;
       break;
     case 'main':
       Component = MainView;
       break;

   }
   return <Component navigator={navigator} />
 },

 render() {
     return (
         <Navigator
             initialRoute={{name: 'main'}}
             configureScene={this.configureScene}
             renderScene={this.renderScene} />
     );
 }

});
var styles = StyleSheet.create({
 container:{
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#f5fcff',
  flex:1,
 },
});


AppRegistry.registerComponent('CityBoxForRN', () => App);
