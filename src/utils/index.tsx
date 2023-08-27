const tokenField = 'token';
const refreshTokenField = 'refresh_token';
const userField = 'user';

export const getTokens = () => {
    const token = localStorage.getItem(tokenField);
    const refreshToken = localStorage.getItem(refreshTokenField);
    if (token && refreshToken) {
        return {token, refreshToken};
    }
    return null;
};

export const setToken = (token: any, refreshToken?: any) => {
    localStorage.setItem(tokenField, token);
    localStorage.setItem(refreshTokenField, refreshToken);
};

export const removeTokens = () => {
    localStorage.removeItem(tokenField);
    localStorage.removeItem(refreshTokenField);
    localStorage.removeItem(userField);
};

export const localStorageSetUser = (user: any) => {
    localStorage.setItem(userField, user);
};

export const localStorageGetUser = () => {
    return localStorage.getItem(userField);
};