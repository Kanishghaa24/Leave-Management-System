document.addEventListener("DOMContentLoaded", () => {

    const registerSection = document.getElementById("registerSection");
    const loginSection = document.getElementById("loginSection");

    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    const message = document.getElementById("message");

    const registerButton = document.getElementById("registerButton");
    const loginButton = document.getElementById("loginButton");

    const API_URL = "/api/leaves";

    // SHOW LOGIN
    document.getElementById("showLogin").addEventListener("click", (event) => {

        event.preventDefault();

        registerSection.hidden = true;
        loginSection.hidden = false;

        message.textContent = "";

    });

    // SHOW REGISTER
    document.getElementById("showRegister").addEventListener("click", (event) => {

        event.preventDefault();

        loginSection.hidden = true;
        registerSection.hidden = false;

        message.textContent = "";

    });

    // REGISTER
    registerForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const data = {
            username: document.getElementById("username").value.trim(),
            email: document.getElementById("email").value.trim().toLowerCase(),
            rollNumber: document.getElementById("rollNumber").value.trim(),
            casualLeave: Number(document.getElementById("casualLeave").value),
            medicalLeave: Number(document.getElementById("medicalLeave").value)
        };

        try {

            registerButton.disabled = true;
            message.textContent = "Registering...";

            const response = await fetch(`${API_URL}/register`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)

            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Registration failed");
            }

            message.textContent = "Registration successful! Please login.";

            registerForm.reset();

            registerSection.hidden = true;
            loginSection.hidden = false;

            document.getElementById("loginEmail").value = data.email;

        } catch (error) {

            console.error("Registration error:", error);
            message.textContent = error.message;

        } finally {

            registerButton.disabled = false;

        }

    });

    // LOGIN
    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();

        try {

            loginButton.disabled = true;
            message.textContent = "Checking login details...";

            const response = await fetch(`${API_URL}/login`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({ email })

            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Login failed");
            }

            if (!result.userId) {
                throw new Error("User ID not received from server");
            }

            sessionStorage.setItem("leaveUserId", result.userId);

            window.location.assign("/dashboard.html");

        } catch (error) {

            console.error("Login error:", error);
            message.textContent = error.message;

        } finally {

            loginButton.disabled = false;

        }

    });

});