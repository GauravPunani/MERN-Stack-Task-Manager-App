import express from 'express'
import loginController from '../controllers/auth/loginController'
import singupController from '../controllers/auth/signupController'
import refreshTokenController from '../controllers/auth/refreshTokenController'

// create router instance
const router = express.Router()

router.post('/login', loginController)
router.post('/signup', singupController)
router.post('/refreshToken', refreshTokenController)

export default router