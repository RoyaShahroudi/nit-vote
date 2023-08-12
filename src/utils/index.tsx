const tokenField = 'token';
const refreshTokenField = 'refresh_token';

export const isLoggedIn = () => getTokens() !== null;

export const getTokens = () => {
    const token = localStorage.getItem(tokenField);
    const refreshToken = localStorage.getItem(refreshTokenField);
    if (token && refreshToken) {
        return { token, refreshToken };
    }

    return null;
};

export const setToken = (token: any, refreshToken?: any) => {
    localStorage.setItem(tokenField, token);
    localStorage.setItem(refreshTokenField, refreshToken);
};

export const logout = () => {
    localStorage.removeItem(tokenField);

    // window.location.replace(config('PANEL_BASE_URL') + '/login');
};
