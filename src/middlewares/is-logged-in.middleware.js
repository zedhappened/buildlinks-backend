
const isLoggedIn = (loggedIn) => async (req, res, next) => {
    if (loggedIn) {
        if (req?.user)
            return next();
        throw new Error("User not logged in")
    } else {
        if (!req?.user)
            return next();
        throw new Error("User already logged in")
    }
};

export default isLoggedIn