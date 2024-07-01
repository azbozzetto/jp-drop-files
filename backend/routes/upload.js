const express = require('express');
const multer = require('multer');
const Upload = require('../models/upload');
const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Upload route
router.post('/', upload.single('file'), async (req, res) => {
    const { childName } = req.body;
    const imageUrl = req.file.path;
    const newUpload = new Upload({ user: req.user.userId, childName, imageUrl });
    await newUpload.save();
    res.status(201).send('File uploaded');
});

module.exports = router;
