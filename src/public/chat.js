
const socket = io();
let user;
let chatBox = document.getElementById('chatBox');

socket.on('newUserConnected', data => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        title: `${data} se ha unido al chat`,
        icon: 'success',
        showConfirmButton: false,
        timer: 10000
      })
});

Swal.fire({
    title: '¡Bienvenido!',
    input: text,
    text: 'Ingresa tu usuario',
    inputValidator: (value) => {
        return !value && 'Complete su nombre de usuario'
    },
    allowOutsideClick: false
}). then((result) => {
    user = result.value;
    let title = document.getElementById('title');
    title.innerHTML = `Bienvenido ${user} al Ecommerce`;
    socket.emit('authenticated', user);
});

chatBox.addEventListener('keyup', evt => {
    if(evt.key === "Enter"){
        if(chatBox.value.trim().lenght > 0) {
            socket.emit('message', { user: user, message: chatBox.value });
            chatBox.value = "";
        }
    }
})

socket.on('messageLogs', data => {
    if(!user) return
    let log = document.getElementById('messageLogs');
    let messages = "";
    data.forEach(message => {
        messages += `${message.user}: ${message.message}<br/>`
    })
    log.innerHTML = messages;
})