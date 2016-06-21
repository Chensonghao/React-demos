var React=require('react');
var ReactDOM = require('react-dom');
var Parent = require('./components/Parent.jsx');
ReactDOM.render(<Parent />, document.getElementById('app'));

var [name,gender,age]=['wayou','male','secrect'];//数组解构
console.log(`my name is ${name}`);
var fn= (v=>console.log(v));
fn(11);
var a=[];
for(let i=0;i<10;i++){
	a[i]=function(){
		console.log(i);
	}
}
a[6]();