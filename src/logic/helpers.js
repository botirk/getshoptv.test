// helper functions
export const MAX_PHONE_NUMBER_LENGTH = 10;

export const addNumberToPhoneNumber = (phoneNumber, toAdd) => () => {
  if (phoneNumber.length >= MAX_PHONE_NUMBER_LENGTH) { return phoneNumber; }

  return phoneNumber + toAdd.toString();
};

export const removeNumberFromPhoneNumber = (phoneNumber) => () => {
  if (phoneNumber.length === 0) { return phoneNumber; }

  return phoneNumber.slice(0, -1);
};
