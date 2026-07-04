import express from 'express';
import ProjectRequest from '../models/ProjectRequest.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all project requests (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const requests = await ProjectRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create project request (public)
router.post('/', async (req, res) => {
  try {
    const { name, college, course, email, mobile, chooseProject, ownProjectTopic, projectType, description } = req.body;

    if (!name || !college || !course || !email || !mobile || !description) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const request = new ProjectRequest({ name, college, course, email, mobile, chooseProject, ownProjectTopic, projectType, description });
    await request.save();
    res.status(201).json({ success: true, message: 'Request sent successfully, Our Team will contact you soon.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH update project request status (admin only)
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Accepted', 'Initiated', 'Processing', 'Completed', 'Declined'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    const request = await ProjectRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE project request (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await ProjectRequest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Request deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
