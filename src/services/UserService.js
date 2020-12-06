import database from "../models";

class UserService {
  static async createUser(newUser) {
    try {
      return await database.User.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  static async loginUser(userCred) {
    try {
      const user = await database.User.findOne({
        where: {
          email: userCred.email,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
