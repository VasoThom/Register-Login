// const handleForm = (e) => {
//   e.preventDefault();
//   console.log("register");

//   const email = document.querySelector("#email");
//   const password = document.querySelector("#password");
//   const password2 = document.querySelector("#password2");
//   const message = document.querySelector("#message");

//   if (password.value != password2.value) {
//     message.innerHTML = "Check your password";
//     return;
//   }
// };

function handleForm(event) {
  alert("Hello");
  event.preventDefault();

  const email = document.querySelector("#email");
  const password1 = document.querySelector("#password");
  const password2 = document.querySelector("#password2");
  const message = document.querySelector("#message");

  if (password1.value != password2.value) {
    message.innerText = "Passwörter stimmen nicht überein";
    return;
  }

  fetch("http://localhost:4060/auth/register", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password1.value,
    }),
  })
    .then((res) => {
      console.log(res);
      if (res.status != 201) {
        throw new Error("Registrierung nicht erfolgreich");
      } else {
        return res.json();
      }
    })
    .then((json) => {
      window.location.href = "index.html";
    })
    .catch((err) => {
      message.innerText = err.message;
    });
}
