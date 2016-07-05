var React = require('react'),
    ReactDOM = require('react-dom');

var Timer = {
    setInterval: function(callback, interval) {
        var token = window.setInterval(callback, interval);
        this._intervals.push(token);
        return token;
    },
    componentWillMount: function() {
        this._intervals && this._intervals.map(window.clearInterval);
    },
    componentDidMount: function() {
        this._intervals = [];
    }
}
var Since2014 = React.createClass({
    mixins: [Timer],
    componentDidMount: function() {
        this.setInterval(this.forceUpdate.bind(this), 1000);
    },
    render: function() {
        var from = Number(new Date(2014, 0, 1)),
            to = new Date();
        return (
            <div>{Math.round((to - from) / 1000)}</div>
        );
    }
});
ReactDOM.render(<Since2014/>, document.getElementById('demo'));
