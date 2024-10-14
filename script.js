function generatePassword() {
    const length = document.getElementById('length').value;

    // Validar longitud
    if (length < 6 || length > 30 || isNaN(length)) {
        alert("Por favor, ingresa una longitud entre 6 y 30 caracteres.");
        return;
    }

    // Verificar qué caracteres incluir
    let charset = "";
    if (document.getElementById('includeLower').checked) charset += "abcdefghijklmnopqrstuvwxyzñ";
    if (document.getElementById('includeUpper').checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZÑ";
    if (document.getElementById('includeNumbers').checked) charset += "0123456789";
    if (document.getElementById('includeSymbols').checked) charset += "!@#$%^&*()_+-={}[]|;:,.<>?";

    if (charset === "") {
        alert("Debes seleccionar al menos una opción de caracteres.");
        return;
    }

    // Generar la contraseña
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    // Mostrar la contraseña
    document.getElementById('password').value = password;

    // Evaluar la fuerza de la contraseña
    evaluateStrength(password);
}

function copyPassword() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    passwordField.setSelectionRange(0, 99999); // Para dispositivos móviles
    document.execCommand("copy");
    alert("Contraseña copiada al portapapeles");
}

function evaluateStrength(password) {
    const strengthBar = document.getElementById('strengthBar');
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.match(/[A-ZÑ]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[!@#$%^&*()_+-={}[]|;:,.<>?]/)) strength++;

    // Resetear la clase de la barra de fuerza
    strengthBar.className = "";

    // Cambiar el color de la barra de acuerdo a la fuerza
    if (strength <= 1) {
        strengthBar.classList.add("strength-weak");
    } else if (strength == 2) {
        strengthBar.classList.add("strength-medium");
    } else {
        strengthBar.classList.add("strength-strong");
    }
}
