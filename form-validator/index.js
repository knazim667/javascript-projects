const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confPassword = document.getElementById("confirmPassword");

function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group error";
  const small = formGroup.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
}

function checkValidateEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not Valid");
  }
}

function checkFieldRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value === "") {
      showError(input, `${getFieldName(input)} is Required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be atleast ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} should be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, `${getFieldName(input2)} do not match`);
  }
}

function getFieldName(input) {
  const firstCharacter = input.id.charAt(0);
  const restCharacters = input.id.slice(1);
  return firstCharacter.toUpperCase() + restCharacters;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkFieldRequired([username, email, password, confPassword]);
  checkValidateEmail(email);
  checkLength(username, 3, 15);
  checkLength(password, 6, 26);
  checkMatch(password, confPassword);
});
