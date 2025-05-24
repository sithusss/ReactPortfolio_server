import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  status: { type: String, default: 'unread' }, // NEW FIELD: 'unread' or 'read'
  createdAt: {
    type: Date,
    default: Date.now
  },
},{ timestamps: true });

export default mongoose.model("Contact", ContactSchema);
