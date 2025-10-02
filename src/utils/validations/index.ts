export const EMAIL_REGEX =
    /^(?!\s)(?!.*\s$)(?!.*\s@)(?!.*@\s)(?!.*\s\.)(?!\.\s)(?!.*\.\s@)(?!.*@\s\.)(?!.*\s\.\s)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-\s]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.(?:com|ru|org|net|gov|edu|io|info|biz|de|fr|uk|jp|cn|au|ca|es|it|nl|se|no|dk|fi|pl|br|mx|ar|ch|at|be|pt|gr|tr|ua|kz|by|az|il|in|co|me|tv|us|cc|nu|eu|xyz|online|site|tech|store|shop|app|dev|ai|cloud)(?:\.[a-zA-Z]{2,})?)$/;

export const validateEmail = (email: string) => {
    return EMAIL_REGEX.test(email);
};
