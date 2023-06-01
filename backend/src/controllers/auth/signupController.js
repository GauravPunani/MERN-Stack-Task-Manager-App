import jsonResponse from "../../helpers/jsonResponse";
import User from "../../mongoose/models/UsersModal";
import bcrypt from 'bcrypt'

const singupController = async (req, res, next) => {

  try {



    const { email, password } = req.body

    // Check if the username already exists
    const existingUser = await User.findOne({ email })
    console.log(existingUser)

    if (existingUser) return jsonResponse(res, 409, 'Username already exists')

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) throw new Error('Failed to create user');

      // Create a new user object
      const user = await User.create({ email, password: hashedPassword })

      return jsonResponse(res, 201, 'User created successfully', null, user)
    })

  } catch (error) {
    return jsonResponse(res, 500, 'something went wrong, please try again')
  }

}
export default singupController