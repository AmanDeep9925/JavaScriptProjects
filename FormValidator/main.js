// * getting all the DOM fields that we are gonna needed

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

// * showing the input error
const showError = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
};

// * showing the input message
const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
};

// * validating the Email

const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(input.value).toLowerCase())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
};

// * Capitalizing the field name

const getFieldName = (input) => {
    return (
        String(input.id).charAt(0).toUpperCase() +
        String(input.id).substring(1, input.id.length)
    );
};

// * check Required function
const checkRequired = (inputArray) => {
    inputArray.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required 😢`);
        } else {
            showSuccess(input);
        }
    });
};

// * check length function

const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less ${max} characters`
        );
    } else {
        showSuccess(input);
    }
};

// * Check confirm password fucntion

const checkPasswordMatch = (input1, input2) => {
    if (input1.value != input2.value) {
        showError(input2, "Passwords don't match");
    }
};

// * event lisiteners
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputs = [username, email, password, confirmPassword];
    checkRequired(inputs);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, confirmPassword);
});
