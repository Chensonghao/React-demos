var React=require('react'),
	ReactDOM=require('react-dom'),
	progress_dw=require('./progress_dw');

var Line = React.createClass({
	componentDidMount:function(){
		var lineDOM=ReactDOM.findDOMNode(this.refs.line);
		var pdw = new progress_dw(lineDOM);

		var idx = 0;
	    var timer = setInterval(function() {
	        idx += 0.02;
	        if (idx.toFixed(3) > 1) {
	            return window.clearInterval(timer);
	        }
	        pdw.lineProgress(idx);
	    }, 30);
	},
    render: function() {
	    return (
	     <div ref="line" style={{width:'100%',height:'30px'}}></div>
	    );
    }
});
module.exports=Line;