export const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules && rules.required) {
        isValid = !!value && value.trim() && isValid;
    }
    if (rules && rules.minLength) {
        isValid = value.trim().length >= rules.minLength && isValid;
    }
    if (rules && rules.maxLength) {
        isValid = value.trim().length <= rules.maxLength && isValid;
    }
    return isValid;
};
