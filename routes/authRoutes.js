import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs'; // For hashing comparison

const { sign, verify } = jwt;
const router = Router();

// Hardcoded user
const hardcodedUser = {
  email: 'sithumanisandali@gmail.com',
  // This is a bcrypt hash of the pw
  password: '$2b$10$ilCWq7ClCW5SlZCpz40PPOpW3YfTae5Rz7WtJ3LQY6R3tMGK.TWiS'
};

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check email
  if (email !== hardcodedUser.email) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  // Compare password using bcrypt
  const isMatch = await compare(password, hardcodedUser.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Generate JWT
  const token = sign({ email }, process.env.JWT_SECRET || 'your-secret', {
    expiresIn: '1h',
  });

  res.json({ token });
});

export default router;
