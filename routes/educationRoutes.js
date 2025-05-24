import express from 'express';
import Education from '../models/Education.js';
const router = express.Router();

// Get all educations
router.get('/', async (req, res) => {
  try {
    const edu = await Education.find();
    res.json(edu);
  } catch (err) {
    console.error('Error fetching educations:', err);
    res.status(500).json({ error: 'Failed to fetch educations' });
  }
});


// Create new education
// In your backend routes (educationRoutes.js)
router.post('/', async (req, res) => {
  try {
    const newEdu = new Education(req.body);
    await newEdu.save();
    res.status(201).json(newEdu); // 201 = Created
  } catch (err) {
    res.status(400).json({ message: err.message }); // 400 = Bad Request
  }
});

// Update education
router.put('/:id', async (req, res) => {
  const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete education
router.delete('/:id', async (req, res) => {
  await Education.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

export default router;
