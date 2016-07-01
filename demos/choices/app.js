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
        return {
            checked: false,
            id: uniqueId('choice-')
        };
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
                    <input type="radio"
                        name={this.props.name}
                        id={this.props.id}
                        value={this.props.value}
                        checked={this.state.checked}
                        onChange={this.handleChanged}/> {this.props.label}
                </label>
            </div>
        );
    }
});
var Choices = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        choices: React.PropTypes.array.isRequired,
        onCompleted: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
            id: uniqueId('Choices-'),
            value:this.props.value
        }
    },
    handleChanged:function(value){
        this.setState({
            value:value
        });
        this.props.onCompleted(value);
    },
    renderChoices: function() {
        return this.props.choices.map(function(choice, i) {
            var key='choice' + i;
            return <Choice key={key} id={key}
                name={this.state.id}
                label={choice}
                value={choice}
                checked={this.state.value===choice}
                onChanged={this.handleChanged}/>
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

var items = ['A', 'B', 'C', 'D'];
function qwe(a){
    console.log(a);
}
ReactDOM.render(<Choices choices={items} value='' onCompleted={qwe}/>, document.getElementById('choices'));
