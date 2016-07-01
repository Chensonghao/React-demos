var React = require('react'),
    ReactDOM = require('react-dom');
//PureRenderMixin = require('react-addons-pure-render-mixin');

var Child1 = React.createClass({
    //createClass时执行的，初始化props
    getDefaultProps: function() {
        return {title: 'react test'};
    },
    getInitialState: function() {
        return {checked: this.props.checked};
    },
    componentWillMount: function() {
        console.log(this.props);
    },
    render: function() {
        return (
          <div>子组件1<input type="checkbox" checked={this.state.checked}/>
            {this.state.checked ? '选中' : '未选中'}
          </div>
        );
    },
    componentDidMount: function() {},
    //render之前触发
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.checked !== undefined) {
            this.setState({checked: nextProps.checked});
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        //确保组件不需要渲染新的props或者state则return false
        return nextProps.checked !== this.props.checked;
    },
    componentWillUpdate: function() {},
    //render后
    componentDidUpdate: function() {},
    //组件被移除之前调用
    componentWillUnmount: function() {}
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
