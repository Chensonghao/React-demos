var React = require('react'),
    ReactDOM = require('react-dom');

var Form1 = React.createClass({
    submit: function(e) {
        e.preventDefault();
        var input = this.refs.input;
        console.log('submit:' + input.value);
    },
    render: function() {
        return (
            <form onSubmit={this.submit}>
                <h2>无约束组件</h2>
                <input type="text" ref="input" defaultValue="hello world!"/>
                <input type="checkbox" defaultChecked/>
                <button type="submit">提交</button>
            </form>
        );
    }
});
var Form2 = React.createClass({
    getInitialState: function() {
        return {
            input:'hi input',
            textarea: 'hello world!',
            select: 'C',
            mselect: ['A', 'C'],
            radio:'B'
        };
    },
    handleTextChange: function(name,e) {
        var newState={};
        //--1、使用bind传递参数，判断更新哪个组件状态
        //newState[name]=e.target.value;
        //--2、使用name，判断更新哪个组件状态
        newState[e.target.name]=e.target.value;
        this.setState(newState);
        console.log(name +': '+ e.target.value);
    },
    handleSelectChange: function(e) {
        this.setState({select: e.target.value});
        console.log(e.target.value);
    },
    handleMSelectChange: function(e) {
        var sel = e.target,
            checked = [];
        for (var i = 0; i < sel.length; i++) {
            var opt = sel.options[i];
            if (opt.selected) {
                checked.push(opt.value);
            }
        }
        this.setState({mselect: checked});
    },
    handleRadioChange:function(e){
        this.setState({radio: e.target.value});
    },
    submit: function(e) {
        e.preventDefault();
        console.log('textarea:' + this.state.textarea + ';select:' + this.state.select+';radio:' + this.state.radio);
        console.log('multiple select:',this.state.mselect);
    },
    render: function() {
        return (
            <form onSubmit={this.submit}>
                <h2>约束组件</h2>
                <textarea type="text" name="textarea" value={this.state.textarea} onChange={this.handleTextChange.bind(this,'textarea')}/>
                <input type="text" name="input" value={this.state.input} onChange={this.handleTextChange.bind(this,'input')}/>
                <br/>
                <select value={this.state.select} onChange={this.handleSelectChange}>
                    <option value="A">选项A</option>
                    <option value="B">选项B</option>
                    <option value="C">选项C</option>
                    <option value="D">选项D</option>
                </select>
                <select multiple="true" value={this.state.mselect} onChange={this.handleMSelectChange}>
                    <option value="A">选项A</option>
                    <option value="B">选项B</option>
                    <option value="C">选项C</option>
                    <option value="D">选项D</option>
                </select>
                <input type="radio" checked={this.state.radio==='A'} value="A" onChange={this.handleRadioChange}/>
                <input type="radio" checked={this.state.radio==='B'} value="B" onChange={this.handleRadioChange}/>
                <input type="radio" checked={this.state.radio==='C'} value="C" onChange={this.handleRadioChange}/>
                <button type="submit">提交</button>
            </form>
        );
    }
});

ReactDOM.render(
    <div><Form1/><Form2/></div>, document.getElementById('demo'));
