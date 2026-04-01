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
