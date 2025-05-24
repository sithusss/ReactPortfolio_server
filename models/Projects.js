import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectId: { type: String, unique: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  technologies: { type: String, required: true },
  period: { type: String, required: true },
  description: { type: String },
  githubLink: { type: String },
  liveLink: { type: String },
  media: { type: String },
});

projectSchema.pre('save', async function (next) {
  if (!this.projectId) {
    const count = await mongoose.model('Project').countDocuments();
    this.projectId = `PRO-${(count + 1).toString().padStart(3, '0')}`;
  }
  next();
});

export default mongoose.model('Project', projectSchema);
