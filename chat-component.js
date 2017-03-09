const ChatApp = React.createClass({
	getInitialState: function () {
		return {
			username: 'anon',
			messages: [],
			socket: window.io('http://localhost:3000')
		}
	},
	componentDidMount: function () {
		this.state.socket.on('receiveMessage', (newMessage) => {
			console.log('server sent back a new message: ', newMessage)
			this.state.messages.push(newMessage)
			this.setState({messages: this.state.messages})
			console.log(this.state.messages)
		})
	},
	submitMessage: function () {
		const message = document.getElementById('message').value
		// sending a new message to the server
		this.state.socket.emit('newMessage', message)
	},
	setUserName: function () {
		const username = document.getElementById('username').value
		this.setState({username: username})
	},
	render () {
		const username = this.state.username
		
		const messages = this.state.messages.map(function (msg, i) {
			return (
				<li key={i}>{username} said: {msg}</li>
			)
		})
		
		return (
			<div>
				<h2>Hello, {username}!</h2>
				
				<input id="username" type="text"/>
				<button onClick={this.setUserName}>Set username</button>
				<br/>
				
				<input id="message" type="text"/>
				<button onClick={this.submitMessage}>Send</button>
				<br/>
				
				<ul>{messages}</ul>
			
			</div>
		)
	}
})

ReactDOM.render(
	<ChatApp/>,
	document.getElementById('chat-app')
)