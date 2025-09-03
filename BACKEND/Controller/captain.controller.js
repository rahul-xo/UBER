import { validationResult } from "express-validator";
import captainModel from "../Models/captain.model.js";
import { createCaptain } from "../Services/captain.service.js";
import blacklistTokenModel from "../Models/blacklistToken.model.js";
export const registerCaptain = async (req, res) => {
  const error = validationResult(req);
  if (!error) return res.status(400).json({ errors: error.array() });

  const { fullname, vehicle, password, email } = req.body;

  const isExist = await captainModel.findOne({ email });
  if (isExist) return res.status(400).json("Captain Already Exist");

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    vehicleType: vehicle.vehicleType,
    capacity: vehicle.capacity,
  });

  const token = captain.generateToken();

  res.status(201).json({ token, captain });
};

export const loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors) return res.status(400).json({ errors: errors });

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) return res.status(401).json("Invalid email or password");

  const isCaptain = await captain.comparePassword(password);
  if (!isCaptain) return res.status(400).json("Invalid email or password");

  const token = captain.generateToken();

  res.cookie("token", token);
  res.status(200).json({ token, captain });
};

export const captainProfile = (req, res) => {
  res.status(200).json({ captain: req.captain });
};

export const logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  res.clearCookie("token");
  await blacklistTokenModel.create({ token });
  res.status(200).json({ message: "logged Out" });
};
