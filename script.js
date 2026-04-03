const CLIENT_ID = "1377273383124734036"

// 🔗 YOUR WEBHOOK HERE
const WEBHOOK = "https://discord.com/api/webhooks/1488970613094617119/4rQwpRgn8CTDOp6bZSUhl0I4Bp6z7Hy_QWpj8zzvaB7OOtT_6kp8hlL2a-UGVM-n5_0m"

// 🔐 LOGIN
function login(){
const url = "https://discord.com/oauth2/authorize?client_id=1377273383124734036&response_type=token&redirect_uri=https%3A%2F%2Fdjjs2010.github.io%2Fdiscord-termux-web&scope=identify"
window.location.href = url
}

// 🚪 LOGOUT
function logout(){
localStorage.removeItem("token")
location.reload()
}

// 👤 GET USER
async function getUser(){

let token = null

if (window.location.hash.includes("access_token")) {
const params = new URLSearchParams(window.location.hash.substring(1))
token = params.get("access_token")
localStorage.setItem("token", token)

// 🔥 remove token from URL
window.history.replaceState({}, document.title, window.location.pathname)
}

if (!token){
token = localStorage.getItem("token")
}

if (!token) return

const res = await fetch("https://discord.com/api/users/@me", {
headers: { Authorization: "Bearer " + token }
})

const user = await res.json()

document.getElementById("user").innerHTML = `
<img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" width="80">
<br>${user.username}
`

// save username for sending messages
localStorage.setItem("username", user.username)
}

// 💬 SEND MESSAGE
async function send(){

let msg = document.getElementById("msg").value
let username = localStorage.getItem("username") || "WebUser"

await fetch(WEBHOOK, {
method: "POST",
headers: {"Content-Type":"application/json"},
body: JSON.stringify({
content: msg,
username: username
})
})

document.getElementById("status").innerText = "Message sent!"
document.getElementById("msg").value = ""

}

getUser()
