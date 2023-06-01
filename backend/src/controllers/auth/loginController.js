import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from "../../mongoose/models/UsersModal";
import jsonResponse from '../../helpers/jsonResponse';

const loginController = async (req, res, next) => {

    try {



        const { email, password } = req.body

        // fetch user by email
        const user = await User.findOne({ email })
        if (!user) return jsonResponse(res, 400, 'user does not exist')

        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) return jsonResponse(res, 400, 'Authentication failed')

            // Generate a JWT token
            const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
            const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '30d' })

            return jsonResponse(res, 200, null, null, { accessToken, refreshToken })
        });
    } catch (error) {
        return jsonResponse(res, 500, 'something went wrong, please try again')
    }
}
export default loginController