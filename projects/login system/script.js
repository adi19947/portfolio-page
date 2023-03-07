const form = document.getElementById('login-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const result = document.getElementById('result-login')
    // Your login logic here

    if (username === "adi dan") {
        result.style.color = "green";
        result.textContent = "success";
    } else {
        result.style.color = "red";
        result.textContent = "log-in failed, wrong user name"
    }
    if (password === "0000") {
        result.style.color = "green";
        result.textContent = "success";
    } else {
        result.style.color = "red";
        result.textContent = "log-in failed, wrong password"
    }
    if (password === "0000" && username === "adi dan") {
        result.style.color = "green";
        result.textContent = "success";
    } else {
        result.style.color = "red";
        result.textContent = "log-in failed, wrong password and user name"
    }



    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
});
