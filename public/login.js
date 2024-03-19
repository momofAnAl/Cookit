const baseUrl = "http://localhost:8000";

const loginForm = document.querySelector("#loginForm");
const signupForm = document.querySelector("#sign-up-form");
const welcomeMessage = document.querySelector("#welcome-message");
const errorMessage = document.querySelector("#errorMessage");

function getCookieValue(key) {
  return document.cookie
    .split(";")
    .find((it) => it.trim().startsWith(`${key}=`))
    ?.split("=")[1];
}

if (loginForm) {
  const usernameSign = document.getElementById("username");
  const passwordSign = document.getElementById("password");
  loginForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const payload = {
      username: usernameSign.value,
      password: passwordSign.value,
    };

    usernameSign.value = "";
    passwordSign.value = "";

    const response = await axios.post(`${baseUrl}/api/signin`, payload);
    if (response.status === 200) {
      // localStorage.setItem('userId', response.data.id);
      window.location.href = "./profile.html";
    }
  });
}

if (signupForm) {
  const usernameSign = document.getElementById("unameSign");
  const passwordSign = document.getElementById("pswSign");
  signupForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const payload = {
      username: usernameSign.value,
      password: passwordSign.value,
    };

    usernameSign.value = "";
    passwordSign.value = "";

    const response = await axios.post(`${baseUrl}/api/users`, payload);
    if (response.status === 200) {
      // const {usernameSign} = response.data;
      welcomeMessage.innerText = `Welcome to Cookit!`;
      setTimeout(() => {
        window.location.href = "home.html";
      }, 4000);
    }
  });
}

