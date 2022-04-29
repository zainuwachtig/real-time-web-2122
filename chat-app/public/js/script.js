const socket = io();
const messages = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
      console.log(input.value)
    }
});

socket.on('chat message', function(e) {
    const item = document.createElement('li');
    item.textContent = e.msg;
    if(socket.id !== e.senderID) {
        item.classList.add('incoming')
    } else {
        item.classList.add('outgoing')
    }
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});