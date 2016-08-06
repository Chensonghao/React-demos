// require('../css/logo.css');
// var React=require('react');
// var Logo = React.createClass({
//     render:function(){
//         return (
//             <img className="logo" src={require('../images/logo.png')} />
//         );
//     }
// });
// module.exports=Logo;

//------es6写法
import '../css/logo.css';
import React from 'react';
var Logo = React.createClass({
    render:function(){
        return (
            <img className="logo" src={require('../images/logo.png')} />
        );
    }
});
module.exports=Logo;
