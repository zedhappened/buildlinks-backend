
const fallbackRoute = (req, res) => {
    throw new Error("The requested API endpoint does not exist")
}

export default fallbackRoute;