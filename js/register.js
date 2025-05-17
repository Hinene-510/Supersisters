document.querySelector(".login-form").addEventListener("submit", function (e) {
	e.preventDefault();

	const name = document.getElementById("name").value.trim();
	const email = document.getElementById("email").value.trim();
	const password = document.getElementById("password").value.trim();
	const confirmPassword = document
		.getElementById("confirmPassword")
		.value.trim();

	if (!name || !email || !password || !confirmPassword) {
		alert("Please fill in all fields.");
		return;
	}

	if (password !== confirmPassword) {
		alert("Passwords do not match.");
		return;
	}

	const user = { name, email, password };
	localStorage.setItem("user", JSON.stringify(user));

	alert("Registration successful!");
	window.location.href = "login.html";
});
