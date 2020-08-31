module.exports = async (user,  accessToken) => {
    const token = await accessToken.generateAccessToken({ uid: user._id });
    return token;
}