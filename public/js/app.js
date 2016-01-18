var socket = io();

socket.on('connect', function () {
	console.log('Connected to socket.io server!');
});

// checking for message from server, displaying once it hits
socket.on('message', function (data) {
	console.log('New message:');
	console.log(data.text);
	ui.interactiveModule.postMessage(data);
});

var ui = {};

ui.interactiveModule = {
	cacheDom: function () {
		this.$form = $('#message-form');
		this.$message = $('#message');
		this.$chat = $('#chat');
	},
	bindEvents: function () {
		this.submitMessage();
	},
	init: function () {
		this.cacheDom();
		this.bindEvents();
	},
	submitMessage: function () {
		var self = this;
		this.$form.on('submit', function (event) {
			event.preventDefault();

			socket.emit('message', {
				text: self.$message.val()
			});

			self.$message.val('');
		});
	},
	postMessage: function (message) {
		var self = this;
		this.$chat.append('<li>' + message.text + '</li>');
	}
}

ui.interactiveModule.init();