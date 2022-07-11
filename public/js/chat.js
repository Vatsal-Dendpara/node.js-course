const socket = io()

// socket.on('countUpdated',(count)=>{
//     console.log('count updated',count);
// })

socket.on('message',(msg)=>{
    console.log(msg);
})
const chat = document.getElementById('chatbox');
document.getElementById('inc').addEventListener('click',()=>{
    const texts = chat.value;
    socket.emit('sendMessage',texts);
});
