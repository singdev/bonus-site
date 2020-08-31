module.exports = async (token,  accessToken ) => {
    const decoded = await accessToken.decodAccessToken(token);
    return decoded;
}