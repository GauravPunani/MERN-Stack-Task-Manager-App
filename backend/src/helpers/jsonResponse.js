const jsonResponse = (res, statusCode, message, code, data) => {
    return res.status(statusCode).send({
        statusCode,
        response: {
            message,
            data,
            code
        }
    })
}

export default jsonResponse