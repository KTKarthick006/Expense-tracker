import bcrypt from "bcrypt";
import User from "../models/userModel.js";

// Register User

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }


    const user = new User({
      username: name,
      email,
      password: password,
    });

    await user.save();
    // console.log({password,hashedPassword})

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error registering user", error });
  }
};

//  Login User
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     req.session.user = { id: user._id, name: user.name, email: user.email };
//     res
//       .status(200)
//       .json({ message: "Login successful", user: req.session.user });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in", error });
//   }
// };
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("User from DB:", user);

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }
    

    const isMatch = await bcrypt.compare(password, user.password);
    console.log({password})
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    req.session.user = { id: user._id, name: user.username, email: user.email };
    res.status(200).json({ message: "Login successful", user: req.session.user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};


//  Logout User
export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logout successful" });
  });
};
