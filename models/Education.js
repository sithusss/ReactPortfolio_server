import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  eduId: { type: String, unique: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  institute: { type: String, required: true },
  period: { type: String, required: true },
  description: { type: String },
  link:{type: String}
});

educationSchema.pre('save', async function (next) {
  if (!this.eduId) {
    const count = await mongoose.model('Education').countDocuments();
    this.eduId = `EDU-${(count + 1).toString().padStart(3, '0')}`;
  }
  next();
});

export default mongoose.model('Education', educationSchema);
