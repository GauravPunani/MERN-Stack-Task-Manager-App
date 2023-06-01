import jwt from 'jsonwebtoken'
import jsonResponse from '../../helpers/jsonResponse'

const refreshTokenController = async (req, res, next) => {

    const { refreshtoken } = req.body

    const decode = jwt.verify(refreshtoken, process.env.JWT_REFRESH_TOKEN_SECRET)

    const accessToken = jwt.sign({ id: decode.id }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1h' })

    return jsonResponse(res, 200, null, null, { accessToken })
}
export default refreshTokenController