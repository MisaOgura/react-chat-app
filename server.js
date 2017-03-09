const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

io.on('connection', (socket) => {
	console.log('socket is connected')
	// when the client sends a message on clicking send button
	socket.on('newMessage', (message) => {
		console.log('new message received from the browser: ', message)
		// socket emits the message back to the client
		io.emit('receiveMessage', message)
	})
	socket.on('test', () => {
		console.log('component mounted')
	})
})

http.listen('3000', () => {
	console.log('listening on port 3000...')
})

