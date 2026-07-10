export const emailValidation = {
    required: "Email address is required",
    pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Please enter a valid email address",
    },
};

export const passwordValidation = {
    required: "Password is required",
    minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
    },
    validate: {
        hasLetter: (value: string) =>
            /[a-zA-Z]/.test(value) || "Password must contain at least one letter",
        hasNumber: (value: string) =>
            /\d/.test(value) || "Password must contain at least one number",
        hasSpecial: (value: string) =>
            /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain at least one special character",
    },
};

export const nameValidation = {
    required: "Full name is required",
    minLength: {
        value: 2,
        message: "Name must be at least 2 characters",
    },
};
