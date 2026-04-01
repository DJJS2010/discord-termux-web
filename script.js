async function send(){

let msg = document.getElementById("msg").value

let webhook = "https://discord.com/api/webhooks/1488970613094617119/4rQwpRgn8CTDOp6bZSUhl0I4Bp6z7Hy_QWpj8zzvaB7OOtT_6kp8hlL2a-UGVM-n5_0m"

await fetch(webhook,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
content: msg
})
})

document.getElementById("status").innerText =
"Message sent to Discord!"

}
