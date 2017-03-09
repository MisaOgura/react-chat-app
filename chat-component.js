const ChatApp = React.createClass({
	getInitialState: function () {
		return {
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
	render () {
		const messages = this.state.messages.map(function (msg, i) {
			return (
				<li key={i}>{msg}</li>
			)
		})
		
		return (
			<div>
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