SERVER_PORT = "http://localhost:8000";

const loginForm = document.querySelector("#loginForm");
const signupForm = document.querySelector("#sign-up-form");
const welcomeMessage = document.querySelector("#welcome-message");
const errorMessage = document.querySelector("#errorMessage");

function getCookieValue(key) {
    return document.cookie.split(';')
        .find(it => it.trim().startsWith(`${key}=`))
        ?.split('=')[1];
}

if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        handleLogin();
    });
    
    function handleLogin () {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        console.log(username, password);
        // Validate the username and password
        if (username === "anhtran" && password === "1234") {
            // If valid, redirect to the profile
            window.location.href = "profile.html";
        } else {
            // If invalid, show an error message
            errorMessage.textContent = "Invalid username or password.";
        }
    }
}

if (signupForm) {
    const usernameSign = document.getElementById("unameSign");
    const passwordSign = document.getElementById("pswSign");
    signupForm.addEventListener('submit', async evt => {
        evt.preventDefault();
        
        const payload = {
            username: usernameSign.value,
            password: passwordSign.value
        };

        usernameSign.value = '';
        passwordSign.value = '';
        
        const response = await axios.post(`${SERVER}/api/users`, payload);
        if (response.status === 200) {
            window.location.href ='home.html';
        }
    });
}

if (welcomeMessage) {
    const userId = getCookieValue('userid');
    if (userId) {
        axios.get(`${SERVER}/api/users/${userId}`).then(response => {
            if (response.status === 200) {
                const { username } = response.data;
                welcomeMessageElement.innerText = `Welcome: ${username}!`;
            }
        });
    // } else {
    //     window.location = './home.html';
    }
}




