  var React = require('react'),
      ReactDOM = require('react-dom'),
      PubSub = require('pubsub-js'),
      signals = require('signals'),
      Signal=new signals();

  /*1. 父－子 通信--通过propss*/
  var MyContainer = React.createClass({
      render: function() {
          return ( < Intermediate text = "where is my son?" / > );
      }
  });
  // 子组件1：中间嵌套的组件
  var Intermediate = React.createClass({
      render: function() {
          return ( < Child text = { this.props.text }/>
          );
      }
  });
  // 子组件2：子组件1的子组件
  var Child = React.createClass({
      render: function() {
          return ( <span> { this.props.text } </span>);
      }
  });

  /*2. 子－父 通信*/
  var GroceryList = React.createClass({
              handleClick: function(i) {
                  console.log('You clicked: ' + this.props.items[i]);
              },
              render: function() {
                  return ( < div > {
                          this.props.items.map(function(item, i) {
                              return ( < div onClick = { this.handleClick.bind(this, i) }
                                  key = { i } > { item } < /div>
                              );
                          }, this)
                      } < /div>);
                  }
              });
  ReactDOM.render( 
  	< GroceryList items = {['Apple', 'Banana', 'Cranberry']}/>, document.getElementById('communication')
  );

  /*3. 没有 父-子 关系的组件间的通信 --可以使用消息发布／订阅的方式－－引用pubsub-js或signals*/
  var People=React.createClass({
  	onclick:function(){
  		//--By PubSub
  		//PubSub.publish('people',this.props.name);

  		//--By signals
  		Signal.dispatch(this.props.name);
  	},
  	render:function(){
  		return (
  			<div onClick={this.onclick}>{this.props.name}</div>
  		);
  	}
  });

  var PeopleSelectionTip=React.createClass({
  	getInitialState:function() {
  	    return {
  	        people:''  
  	    };
  	},
  	//dom加载后调用，订阅
  	componentDidMount:function() {
  	//--By PubSub
  	// 	this.subpub_token=PubSub.subscribe('people', function(msg, data){
  	//   	this.setState({
  	//       	people: data
  	//     	});
	// }.bind(this));

		//--By signals
		this.subpub_token=Signal.add(function(name){
			this.setState({
				people: name
			});
		},this);
		
  	},
  	//dom移除时调用，退订
  	componentWillUnmount:function(){
  		//--By PubSub
  		//PubSub.unsubscribe(this.subpub_token);
  		//--By signals
  		this.subpub_token.detach();
  	},
  	render:function(){
  		return (
  		<div>You have selected: {this.state.people}</div>
  		);
  	}
  });

  var PeopleSelection=React.createClass({
  	render:function(){
  		return (
  			<div style={{marginTop:'30px'}}>
  				<PeopleSelectionTip/>
  				<People name="Alice"/>
  				<People name="Evan"/>
  				<People name="Linda"/>
  			</div>
  		);
  	}
  });

  ReactDOM.render(<PeopleSelection/>,document.getElementById('communication2'));

