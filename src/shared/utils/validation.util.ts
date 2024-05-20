const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const isValidEmail = (email) => {
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phoneNumber) => {
  return phoneNumberRegex.test(phoneNumber);
};

export const isValidDate = (date) => {
  return dateRegex.test(date);
};