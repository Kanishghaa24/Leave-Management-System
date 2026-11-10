```javascript
document.addEventListener("DOMContentLoaded", () => {

    const registerSection = document.getElementById("registerSection");
    const loginSection = document.getElementById("loginSection");
    const message = document.getElementById("message");

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
    document.getElementById("registerForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        data.casualLeave = Number(data.casualLeave);
        data.medicalLeave = Number(data.medicalLeave);

        try {
            const response = await fetch("/api/leaves/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            sessionStorage.setItem("leaveUserId", result.userId);

            window.location.href = "/dashboard.html";

        } catch (error) {
            message.textContent = error.message;
        }
    });

    // LOGIN
    document.getElementById("loginForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/leaves/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: document.getElementById("loginEmail").value
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            sessionStorage.setItem("leaveUserId", result.userId);

            window.location.href = "/dashboard.html";

        } catch (error) {
            message.textContent = error.message;
        }
    });

});
```