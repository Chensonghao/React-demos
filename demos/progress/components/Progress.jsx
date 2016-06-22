var React=require('react'),
	Circle=require('./Circle.jsx'),
	Line=require('./Line.jsx');

var Progress = React.createClass({
    render: function() {
    	return (
    		<div>
    			<Circle/>
    			<Line/>
    		</div>
    	);
    }
 });
module.exports=Progress;