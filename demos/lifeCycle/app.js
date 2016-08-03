var React = require('react'),
    ReactDOM = require('react-dom');
//PureRenderMixin = require('react-addons-pure-render-mixin');

var Child1 = React.createClass({
    //createClass时执行的，初始化props
    getDefaultProps: function() {
        console.log('getDefaultProps');
        return {title: 'react test'};
    },
    getInitialState: function() {
        console.log('getInitialState');
        return {checked: this.props.checked};
    },
    componentWillMount: function() {
        console.log('componentWillMount');
        console.log(this.props);
    },
    render: function() {
        console.log('render');
        return (
          <div>子组件1<input type="checkbox" checked={this.state.checked}/>
            {this.state.checked ? '选中' : '未选中'}
          </div>
        );
    },
    componentDidMount: function() {
        console.log('componentDidMount');
    },
    //render之前触发
    componentWillReceiveProps: function(nextProps) {
        console.log('componentWillReceiveProps');
        if (nextProps.checked !== undefined) {
            this.setState({checked: nextProps.checked});
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        console.log('shouldComponentUpdate');
        //确保组件不需要渲染新的props或者state则return false
        return nextProps.checked !== this.props.checked;
    },
    componentWillUpdate: function() {
        console.log('componentWillUpdate');
    },
    //render后
    componentDidUpdate: function() {
        console.log('componentDidUpdate');
    },
    //组件被移除之前调用
    componentWillUnmount: function() {
        console.log('componentWillUnmount');
    }
});
var Child2 = React.createClass({
    shouldComponentUpdate: function(nextProps, nextState) {
        //确保组件不需要渲染新的props或者state则return false
        return nextProps.checked !== this.props.checked;
    },
    //mixins: [PureRenderMixin],
    render: function() {
        console.log('渲染组件Child2');
        return (
            <div>子组件2<input type="checkbox" checked={this.props.checked}/>{this.props.checked
                    ? '选中'
                    : '未选中'}</div>
        );
    }
});
var Parent = React.createClass({
    getInitialState: function() {
        return {checked1: false, checked2: false};
    },
    onclick: function() {
        this.setState({
            checked1: !this.state.checked1
        });
    },
    touchStart:function(){
      console.log('touchStart');
    },
    render: function() {
        var props = {
            one: 'one',
            two: 'two'
        }
        return (
            <div onTouchStart={this.touchStart}>
                <button onClick={this.onclick}>点击改变状态</button>
                <Child1 checked={this.state.checked1} {...props}/>
                <Child2 checked={this.state.checked2}/>
            </div>
        );
    }
});

ReactDOM.render(
    <Parent name="bigApple"/>, document.getElementById('demo'));
