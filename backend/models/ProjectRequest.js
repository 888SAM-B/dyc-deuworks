import mongoose from 'mongoose';

const projectRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: { type: String, required: true },
  course: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  chooseProject: { type: String, default: '' },
  ownProjectTopic: { type: String, default: '' },
  projectType: { type: String, enum: ['with-documentation', 'only-documentation'], default: 'with-documentation' },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Initiated', 'Processing', 'Completed', 'Declined'], default: 'Pending' },
}, { timestamps: true });

export default mongoose.model('ProjectRequest', projectRequestSchema);
