// helper functions
export const MAX_PHONE_NUMBER_LENGTH = 10;

export const addNumberToPhoneNumber = (phoneNumber: string, toAdd: string) => () => {
  if (phoneNumber.length >= MAX_PHONE_NUMBER_LENGTH) { return phoneNumber; }

  return phoneNumber + toAdd;
};

export const removeNumberFromPhoneNumber = (phoneNumber: string) => () => {
  if (phoneNumber.length === 0) { return phoneNumber; }

  return phoneNumber.slice(0, -1);
};
