document.getElementById("consoleBtn").addEventListener("click", () => {
    window.open("console.html", "_blank");
});

function login() {

const url = "https://discord.com/oauth2/authorize?client_id=1377273383124734036&response_type=token&redirect_uri=https%3A%2F%2Fdjjs2010.github.io%2Fdiscord-termux-web&scope=identify"

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

async function send() {
    let msg = document.getElementById("msg").value;

    const webhook = "https://discord.com/api/webhooks/1488970613094617119/4rQwpRgn8CTDOp6bZSUhl0I4Bp6z7Hy_QWpj8zzvaB7OOtT_6kp8hlL2a-UGVM-n5_0m";

    await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: msg })
    });

    document.getElementById("status").innerText = "Message sent to Discord!";
}
