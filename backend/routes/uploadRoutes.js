// backend/routes/upload.js
import express from 'express';
import cloudinary from '../config/cloudinary.js'; // Import Cloudinary config
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory

// Image upload route
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Using Cloudinary's upload stream
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Image upload failed', error });
        }

        // Send back the URL of the uploaded image
        res.status(200).json({
          message: 'Image uploaded successfully',
          image: result.secure_url, // The URL of the uploaded image
        });
      }
    );

    // Create a stream and send the image buffer to Cloudinary
    stream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: 'Image upload failed', error });
  }
});

export default router;
