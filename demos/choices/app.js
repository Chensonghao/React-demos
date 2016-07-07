var React = require('react'),
    ReactDOM = require('react-dom');
var util = require('lodash/util'),
    uniqueId = util.uniqueId;

var Choice = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired,
        checked: React.PropTypes.bool,
        onChanged: React.PropTypes.func.isRequired
    },
    getDefaultProps: function() {
        return {checked: false, id: uniqueId('choice-')};
    },
    getInitialState: function() {
        return {
            checked: !!this.props.checked
        };
    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.checked !== undefined) {
            this.setState({checked: nextProps.checked});
        }
    },
    handleChanged: function(e) {
        var checked = e.target.checked;
        this.setState({checked: checked});
        if (checked) {
            this.props.onChanged(this.props.value);
        }
    },
    render: function() {
        return (
            <div>
                <label>
                    <input type="radio" name={this.props.name} id={this.props.id} value={this.props.value} checked={this.state.checked} onChange={this.handleChanged}/> {this.props.label}
                </label>
            </div>
        );
    }
});
var Choices = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        choices: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        return {id: uniqueId('Choices-'), value: this.props.value}
    },
    handleChanged: function(value) {
        this.setState({value: value});
        console.log(value);
    },
    renderChoices: function() {
        return this.props.choices.map(function(choice, i) {
            var key = 'choice' + i;
            return <Choice key={key} id={key} name={this.state.id} label={choice} value={choice} checked={this.state.value === choice} onChanged={this.handleChanged}/>
        }.bind(this));
    },
    render: function() {
        return (
            <div>
                {this.renderChoices()}
            </div>
        );
    }
});
var Radio = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func
    },
    getInitialState: function() {
        return {value: this.props.defaultValue};
    },
    handleChange: function(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
        this.setState({value: e.target.value});
    },
    render: function() {
        var children = [];
        var value = this.props.value || this.state.value;
        React.Children.forEach(this.props.children, function(child, i) {
            var label=(
                <label key={i}>
                    <input type="radio"
                           name={this.props.name}
                           value={child.props.value}
                           checked={child.props.value===value}
                           onChange={this.handleChange}/>
                       {child.props.children}
                       <br/>
                </label>
            );
            children.push(label);
        }.bind(this));
        return (<span>{children}</span>);
    }
});

var items = ['A', 'B', 'C', 'D'];
ReactDOM.render(<div>
    <Choices choices={items} value=''/>
    <Radio defaultValue="B">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
    </Radio>
    </div>, document.getElementById('choices'));
