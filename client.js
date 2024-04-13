const socket=io();
const form=document.getElementById("sendcont");
const messageInput=document.getElementById("send");
const messageContainer=document.getElementById("messagebox");

const append=(message,position)=>{
    const messageElement=document.createElement("div");
    messageElement.innerText=message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);
}
form.addEventListener('submit',(evnt)=>{
    evnt.preventDefault();
    const message=messageInput.value;
    append(`you : ${message}`,'right');
    socket.emit('send',message);
    messageInput.value="";
})


const username=prompt("enter you username");
socket.emit("new_user_joined",username);

socket.on("user-joined",(username)=>{
    append(`${username} joined the party :)`,"center");
})

socket.on('recieve',(data)=>{
    append(`${data.username}: ${data.message}`,"left");
})
socket.on("user-left",(username)=>{
    append(`${username} left the party :(`,"center");
})
