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

    console.log(payload);

    const response = await axios.post(`${baseUrl}/api/signin`, payload);
    console.log("cookie32:", getCookieValue);
    if (response.status === 200) {
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

// if (welcomeMessage) {
//   const userId = getCookieValue("userid");
//   if (userId) {
//     axios.get(`${baseUrl}/api/users/${userId}`).then((response) => {
//       if (response.status === 200) {
//         const { username } = response.data;
//         welcomeMessageElement.innerText = `Welcome: ${username}!`;
//       }
//     });
//     // } else {
//     //     window.location = './home.html';
//   }
// }
