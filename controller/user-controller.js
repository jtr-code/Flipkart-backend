import User from "../model/user-schema.js";

export const userSignup = async (request, response) => {
  try {
    const duplicateExist = await User.findOne({
      username: request.body.username,
    });

    if (duplicateExist) {
      return response.status(401).json({ message: "username already exists" });
    }

    const user = request.body;
    console.log(user);
    const newUser = new User(user);
    await newUser.save();

    response.status(200).json({ message: "username saved succesfully " });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const userLogin = async (request, response) => {
  try {
    const username = request.body.username;
    const password = request.body.password;

    let user = await User.findOne({ username: username, password: password });
    if (user) {
      return response.status(200).json({ data: user });
    } else {
      return response.status(401).json("Invalid Login");
    }
  } catch (error) {
    response.status(500).json("Error", error.message);
  }
};
