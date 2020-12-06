import bcrypt from "bcrypt";
import UserService from "../services/UserService";
import Util from "../utils/Utils";
import validateRegisterForm from "../utils/validation/register";
import validateLoginForm from "../utils/validation/login";
import generateToken from "../utils/generateToken";

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
      util.setError(400, errors);
      return util.send(res);
    }

    const loginBody = req.body;

    try {
      let user = await UserService.loginUser(loginBody);
      if (user) {
        if (bcrypt.compareSync(loginBody.password, user.dataValues.password)) {
          const { id, username } = user.dataValues;
          const { token, expiration } = await generateToken(id, username);
          res.cookie("token", token, {
            expires: new Date(Date.now() + expiration),
            secure: false, // set to true if your using https
            httpOnly: true,
          });
          util.setSuccess(200, "You are now logged in!");
          return util.send(res);
        } else {
          util.setError(400, "Invalid User");
          return util.send(res);
        }
      } else {
        util.setError(400, "Invalid User");
        return util.send(res);
      }
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

export default UserController;
