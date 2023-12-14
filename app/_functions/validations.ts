export const oneUpper = (text: string) => /[A-Z]/.test(text);
export const oneLower = (text: string) => /[a-z]/.test(text);
export const oneNumber = (text: string) => /[0-9]/.test(text);
export const oneSpecial = (text: string) => /[^a-zA-Z0-9]/.test(text);
export const alphanumericCharactersOnly = (text: string) => /^[A-Za-z0-9_]+$/.test(text);
export const validateEmail = (text: string) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/.test(text);