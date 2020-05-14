const isEmail = (input: string) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (input.match(regEx)) return true;
  else return false;
};

const isEmpty = (input: string) => {
  if (input.trim() === "") return true;
  else return false;
};

exports.validateSignUp = (data: any) => {
  // Errors Object for Frontend
  let errors: { [k: string]: string } = {};

  // Default Empty Message
  let emptyMessage: string = "Must not be empty";

  // Checks Username Input
  if (isEmpty(data.firstName)) errors.firstName = emptyMessage;
  if (isEmpty(data.lastName)) errors.lastName = emptyMessage;

  // Checks Email Input
  if (isEmpty(data.email)) errors.email = emptyMessage;
  else if (!isEmail(data.email)) errors.email = "Must be a valid email address";

  // Checks Password Input
  if (isEmpty(data.password)) errors.password = emptyMessage;
  else if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords must match";

  // Returns Errors and Validation Status
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateLogIn = (data: any) => {
  // Errors Object for Frontend
  let errors: { [k: string]: string } = {};

  //Default Empty Message
  let emptyMessage = "Must not be empty";

  // Check Email Input
  if (isEmpty(data.email)) errors.email = emptyMessage;

  // Check Password Input
  if (isEmpty(data.password)) errors.password = emptyMessage;

  // Returns Errors and Validation Status
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};