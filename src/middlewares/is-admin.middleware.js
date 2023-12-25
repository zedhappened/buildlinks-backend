
const isAdmin = () => async (req, res, next) => {
    if (req?.user) {
        if (req.user.roles.includes("admin"))
            return next();
    }
    throw new Error("User must be logged in as an admin to perform this action")
};

export default isAdmin