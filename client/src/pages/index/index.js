import $ from 'jquery';
import Socket from '../../lib/Socket.js';

import '../../styles/style.css';
import logo from '../../images/amazon.png';

const socket = new Socket();
socket.socket.on('Hello from server', (...payload) => {
    $('<h1 />').text('Connection established').appendTo('body');
});

$('<img />').attr('src', logo).appendTo('body');