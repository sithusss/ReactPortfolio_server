import express from 'express';
import multer from 'multer';
import Projects from '../models/Projects.js';
import path from 'path';
import fs from 'fs';


const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Get all educations
router.get('/', async (req, res) => {
  try {
    const pro = await Projects.find();
    res.json(pro);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});


// CREATE project (POST)
router.post('/', upload.single('media'), async (req, res) => {
  try {
    console.log('req.file:', req.file);        // debug
    console.log('req.body:', req.body);        // debug

    const mediaPath = req.file ? `/uploads${req.file.filename}` : null;

    const newPro = new Projects({
      ...req.body,
      media: mediaPath,
    });

    await newPro.save();
    res.status(201).json(newPro);
  } catch (err) {
    console.error('Error saving project:', err);
    res.status(400).json({ message: err.message });
  }
});


// UPDATE project (PUT)
router.put('/:id', upload.single('media'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.media = `/uploads/${req.file.filename}`;
    }
    const updatedPro = await Projects.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedPro);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE project (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    await Projects.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ message: err.message });
  }
});

export default router;



