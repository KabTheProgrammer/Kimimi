import express from 'express';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory

// ✅ Change '/upload' → '/'
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto', folder: 'products' },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload failed:', error);
          return res.status(500).json({ message: 'Image upload failed', error });
        }

        res.status(200).json({
          message: 'Image uploaded successfully',
          image: result.secure_url,
        });
      }
    );

    stream.end(req.file.buffer);
  } catch (error) {
    console.error('Upload route error:', error);
    res.status(500).json({ message: 'Image upload failed', error });
  }
});

export default router;
