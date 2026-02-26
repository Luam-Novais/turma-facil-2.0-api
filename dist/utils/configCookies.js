export const configAccessToken = {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60,
};
