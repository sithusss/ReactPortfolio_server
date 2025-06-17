import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';

const router = Router();

// Hardcoded user
const hardcodedUser = {
  email: 'sithumanisandali@gmail.com',
  // bcrypt hash of the password
  password: '$2b$10$ilCWq7ClCW5SlZCpz40PPOpW3YfTae5Rz7WtJ3LQY6R3tMGK.TWiS'
};

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== hardcodedUser.email) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await compare(password, hardcodedUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.warn('Warning: JWT_SECRET is not set in environment variables.');
    }

    const token = jwt.sign({ email }, secret || 'your-secret', {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;