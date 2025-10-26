import { User } from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokens.js';

export const signup = async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const passwordHash = await User.hashPassword(password);
    const newUser = await User.create({ email, passwordHash, displayName });
    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // set true in production for HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // Return only selected user info, exclude passwordHash
    const user = {
      id: newUser._id,
      email: newUser.email,
      displayName: newUser.displayName,
      profile: newUser.profile,
      goals: newUser.goals,
      gamification: newUser.gamification,
    };
    res.status(201).json({ user, accessToken });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const accessToken = generateAccessToken(existingUser._id);
    const refreshToken = generateRefreshToken(existingUser._id);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const user = {
      id: existingUser._id,
      email: existingUser.email,
      displayName: existingUser.displayName,
      profile: existingUser.profile,
      goals: existingUser.goals,
      gamification: existingUser.gamification,
    };
    res.json({ user, accessToken });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
  res.json({ message: 'Logged out successfully' });
};