document.getElementById("generateBtn").addEventListener("click", generatePassword);
document.getElementById("copyBtn").addEventListener("click", copyPassword);
document.getElementById("length").addEventListener("input", updateLengthDisplay);

function updateLengthDisplay() {
    const lengthValue = document.getElementById("length").value;
    document.getElementById("lengthValue").innerText = lengthValue;
}

function generatePassword() {
    const length = document.getElementById("length").value;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeLowercase = document.getElementById("includeLowercase").checked;

    let characters = "";
    if (includeNumbers) characters += "0123456789";
    if (includeSymbols) characters += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    if (includeUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) characters += "abcdefghijklmnopqrstuvwxyz";

    if (characters.length === 0) {
        alert("Please select at least one character type.");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    document.getElementById("password").value = password;
    evaluateStrength(password);
}

function evaluateStrength(password) {
    const strengthBar = document.getElementById("strengthLevel");
    let strength = 0;

    const lengthCriteria = password.length >= 12;
    const numberCriteria = /[0-9]/.test(password);
    const symbolCriteria = /[!@#$%^&*()_+~`|}{[\]:;?><,./-]/.test(password);
    const upperCriteria = /[A-Z]/.test(password);
    const lowerCriteria = /[a-z]/.test(password);

    if (lengthCriteria) strength++;
    if (numberCriteria) strength++;
    if (symbolCriteria) strength++;
    if (upperCriteria) strength++;
    if (lowerCriteria) strength++;

    const strengthLevel = strength / 5;

    strengthBar.style.width = `${strengthLevel * 100}%`;

    if (strengthLevel <= 0.2) {
        strengthBar.style.backgroundColor = "red";
    } else if (strengthLevel <= 0.4) {
        strengthBar.style.backgroundColor = "orange";
    } else if (strengthLevel <= 0.6) {
        strengthBar.style.backgroundColor = "yellow";
    } else if (strengthLevel <= 0.8) {
        strengthBar.style.backgroundColor = "lightgreen";
    } else {
        strengthBar.style.backgroundColor = "green";
    }
}

function copyPassword() {
    const passwordField = document.getElementById("password");
    passwordField.select();
    document.execCommand("copy");

    const copyMessage = document.getElementById("copySuccess");
    copyMessage.classList.add("show");

    setTimeout(() => {
        copyMessage.classList.remove("show");
    }, 2000);
}
