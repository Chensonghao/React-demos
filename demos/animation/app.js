var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var TodoList = React.createClass({
    getInitialState: function() {
        return {
            items: ['hello', 'world', 'click', 'me']
        };
    },
    handleAdd: function() {
        var newItems = this.state.items.concat([prompt('Enter some text')]);
        this.setState({items: newItems});
    },
    handleRemove: function(i) {
        var newItems = this.state.items.slice();
        newItems.splice(i, 1);
        this.setState({items: newItems});
    },
    render: function() {
        var items = this.state.items.map(function(item, i) {
            return (
                //key值必需
                <div key={item} onClick={this.handleRemove.bind(this, i)}>
                    {item}
                </div>
            );
        }.bind(this));
        return (
            <div>
                <button onClick={this.handleAdd}>Add Item</button>
                <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {items}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
});
var Appear = React.createClass({
    render: function() {
        return (
            <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={false} transitionLeave={false}>
                <h1>Fading at Initial Mount</h1>
            </ReactCSSTransitionGroup>
        );
    }
});

var Progress=React.createClass({
    getInitialState:function(){
        return {
            width:0
        }
    },
    resolveAnimationFrame:function(){
        if(this.state.width<100){
            var width=this.state.width+1;
            this.setState({
                width:width
            });
        }
    },
    componentDidMount:function(){
        this.resolveAnimationFrame();
    },
    componentWillUpdate:function(){
        requestAnimationFrame(this.resolveAnimationFrame);
    },
    render:function(){
        return (
            <div style={{width:this.state.width,height:10,backgroundColor:'green'}}></div>
        );
    }
});
ReactDOM.render(
    <div>
        <TodoList/>
        <Appear/>
        <Progress/>
    </div>, document.getElementById('demo'));
