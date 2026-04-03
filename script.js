const CLIENT_ID = "1377273383124734036"
const REDIRECT_URI = "https://djjs2010.github.io/discord-termux-web"

// 🔐 LOGIN
function login() {

const url = "https://discord.com/oauth2/authorize?client_id=1377273383124734036&response_type=token&redirect_uri=https%3A%2F%2Fdjjs2010.github.io%2Fdiscord-termux-web&scope=identify"

window.location.href = url

}

// 🚪 LOGOUT
function logout(){
localStorage.removeItem("token")
location.reload()
}

// 👤 GET USER
async function getUser() {

let token = null

// 1️⃣ Check URL first
if (window.location.hash.includes("access_token")) {

const params = new URLSearchParams(window.location.hash.substring(1))
token = params.get("access_token")

// 💾 SAVE TOKEN
localStorage.setItem("token", token)

// 🔥 REMOVE TOKEN FROM URL
window.history.replaceState({}, document.title, window.location.pathname)

}

// 2️⃣ If not in URL, get from storage
if (!token) {
token = localStorage.getItem("token")
}

if (!token) return

// 3️⃣ Fetch user
const res = await fetch("https://discord.com/api/users/@me", {
headers: {
Authorization: "Bearer " + token
}
})

const user = await res.json()

document.getElementById("user").innerHTML = `
<img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" width="80">
<br>
Logged in as ${user.username}
`

}

getUser()
