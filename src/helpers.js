export function validateName(name) {
    if(name.length < 3) throw new Error("Name must be atleast 3 characters long!")
    if(name.length > 25) throw new Error("Name can be atmost 25 characters long!")
    // Regular expression pattern for name validation
    const namePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

    // Check if the name matches the pattern
    if (!namePattern.test(name)) {
        throw new Error("Invalid name format. Please provide a valid name!");
    }

    return true;
}


export function validateEmail(email) {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the pattern
    if (!emailPattern.test(email)) {
        throw new Error("Invalid email format. Please provide a valid email address.");
    }

    return true;
}

export function validatePassword(password) {
    // Regular expression pattern for password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check if the password matches the pattern
    if (!passwordPattern.test(password)) {
        throw new Error("Invalid password format. Please provide a password with at least one special character, one uppercase letter, one lowercase letter, one number, and a minimum length of 8 characters.");
    }

    return true;
}


