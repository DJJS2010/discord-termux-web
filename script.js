const CLIENT_ID = "1377273383124734036"
const REDIRECT_URI = "https://djjs2010.github.io/discord-termux-web"

function login() {
  const url =
    "https://discord.com/oauth2/authorize" +
    "?client_id=" + CLIENT_ID +
    "&response_type=token" +
    "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) +
    "&scope=identify"

  window.location.href = url
}

function getUser() {
  if (!window.location.hash) return

  const params = new URLSearchParams(window.location.hash.substring(1))
  const token = params.get("access_token")

  if (!token) return

  fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: "Bearer " + token
    }
  })
  .then(res => res.json())
  .then(user => {
    document.getElementById("user").innerHTML = `
      <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" width="60"><br>
      Logged in as ${user.username}
    `
  })
  .catch(err => {
    document.getElementById("user").innerText = "Login failed"
    console.error(err)
  })
}

getUser()
