function handleForm(e) {
  e.preventDefault();

  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  fetch("http://localhost:4060/auth/login", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then((res) => {
      if (res.status != 200) {
        throw new Error("Login nicht erfolgreich");
      } else {
        return res.json();
      }
    })
    .then((json) => (window.location.href = "index.html"))
    .catch((err) => {
      document.querySelector("#error-message").innerText = err.message;
    });
}
