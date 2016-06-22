var React=require('react'),
	ReactDOM=require('react-dom'),
	progress_dw=require('./progress_dw');

var Circle = React.createClass({
	componentDidMount:function(){
		var circleDOM=ReactDOM.findDOMNode(this.refs.circle);
		var pdw = new progress_dw(circleDOM);

		var idx = 0;
	    var timer = setInterval(function() {
	        idx += 0.02;
	        if (idx.toFixed(3) > 1) {
	            return window.clearInterval(timer);
	        }
	        pdw.circleProgress(idx);
	    }, 30);
	},
    render: function() {
    	return (
    		<div ref="circle" style={{width:'200px',height:'200px',margin:'0 auto'}}></div>
    	);
    }
});
module.exports=Circle;