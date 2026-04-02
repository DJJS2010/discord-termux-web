async function send(){

let msg = document.getElementById("msg").value

document.getElementById("status").innerText =
"Message ready: " + msg

}

// show last github update
async function getUpdate(){

let repo = "DJJS2010/discord-termux-web"

let res = await fetch(
"https://api.github.com/repos/" + repo + "/commits"
)

let data = await res.json()

let date = new Date(data[0].commit.author.date)

document.getElementById("update").innerText =
"Last website update: " + date.toLocaleString()

}

getUpdate()

const CLIENT_ID = "1377273383124734036"
const REDIRECT = window.location.origin + window.location.pathname

function login(){

console.log("Login clicked")

let url =
"https://discord.com/oauth2/authorize?client_id="
+ CLIENT_ID +
"&response_type=token&redirect_uri="
+ encodeURIComponent(REDIRECT) +
"&scope=identify"

console.log(url)

window.location = url

}

function getUser(){

let hash = window.location.hash

if(!hash) return

let token = hash.split("access_token=")[1].split("&")[0]

fetch("https://discord.com/api/users/@me",{
headers:{
authorization:"Bearer " + token
}
})
.then(res=>res.json())
.then(user=>{

document.getElementById("user").innerHTML =

`<img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" width="60">
<br>
Logged in as ${user.username}`

})

}

getUser()
