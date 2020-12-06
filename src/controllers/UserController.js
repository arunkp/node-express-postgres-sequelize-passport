import bcrypt from "bcrypt";
import UserService from "../services/UserService";
import Util from "../utils/Utils";
import validateRegisterForm from "../utils/validation/register";
import validateLoginForm from "../utils/validation/login";
import jwt from "jsonwebtoken";

const secretOrKey = process.env.SECRET;

const util = new Util();

class UserController {
  static async createUser(req, res) {
    const { errors, isValid } = validateRegisterForm(req.body);
    let userBody = req.body;
    if (!isValid) {
      util.setError(400, errors);
      return util.send(res);
    }
    try {
      userBody.password = bcrypt.hashSync(userBody.password, 10);
      await UserService.createUser(userBody);
      util.setSuccess(201, "User Created!");
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async loginUser(req, res) {
    const { errors, isValid } = validateLoginForm(req.body);
    // check validation
    if (!isValid) {
      util.setError(402, errors);
      return util.send(res);
    }

    const loginBody = req.body;

    try {
      let user = await UserService.loginUser(loginBody);
      if (user) {
        if (bcrypt.compareSync(loginBody.password, user.dataValues.password)) {
          const { id, username } = user.dataValues;
          const payload = { id, username }; //jwt payload

          jwt.sign(
            payload,
            secretOrKey,
            {
              expiresIn: 100000,
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
                role: user.dataValues.role,
              });
            }
          );
        } else {
          util.setError(402, "Invalid User");
          return util.send(res);
        }
      } else {
        util.setError(402, "Invalid User");
        return util.send(res);
      }
    } catch (error) {
      util.setError(402, error.message);
      return util.send(res);
    }
  }
}

export default UserController;
