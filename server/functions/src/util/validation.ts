import * as express from "express";

// Checks if Input String is of Email Type
const isEmail = (input: string) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (input.match(regEx)) return true;
  else return false;
};

// Checks if Input String is Empty
const isEmpty = (input: string) => {
  if (input.trim() === "") return true;
  else return false;
};

// Default Empty Message
const emptyMessage: string = "Must Not Be Empty";

// Validates Rant Creation Form
exports.validateRant = (req: express.Request) => {
  // Errors Object for Frontend
  const errors: { [k: string]: string } = {};

  // Checks Title Input
  if (isEmpty(req.body.title)) errors.title = emptyMessage;

  // Checks Body Input
  if (isEmpty(req.body.body)) errors.body = emptyMessage;

  // Returns Errors and Validation Status
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

// Validates Sign Up Form
exports.validateSignUp = (data: any) => {
  // Errors Object for Frontend
  const errors: { [k: string]: string } = {};

  // Checks Handle Input
  if (isEmpty(data.handle)) errors.handle = emptyMessage;

  // Checks Username Input
  if (isEmpty(data.firstName)) errors.firstName = emptyMessage;
  // if (isEmpty(data.lastName)) errors.lastName = emptyMessage;

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

// Validates Log In Form
exports.validateLogIn = (data: any) => {
  // Errors Object for Frontend
  const errors: { [k: string]: string } = {};

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

// Adds Nonempty Properties to User Details Object
exports.reduceUserDetails = (data: any) => {
  const userDetails: { [k: string]: string } = {};

  // TODO: Change User Handle Feature

  // Adds Bio
  if(!isEmpty(data.bio.trim())) userDetails.bio = data.bio;

  // Adds Website
  if(!isEmpty(data.website.trim())) {
    if(data.website.trim().substring(0, 4) !== 'http') userDetails.website = `http://${data.website.trim()}`;
    else userDetails.website = data.website;
  }

  // Returns Updated Object
  return userDetails;
}
