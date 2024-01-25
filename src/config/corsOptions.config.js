const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3557"
]

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Unknown host'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOptions