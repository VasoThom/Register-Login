const handleForm = (e) => {
  e.preventDefault();
  console.log("register");

  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const password2 = document.querySelector("#password2");
  const message = document.querySelector("#message");

  if (password.value != password2.value) {
    message.innerHTML = "Check your password";
    return;
  }
};
