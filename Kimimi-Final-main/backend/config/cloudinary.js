// backend/config/cloudinary.js
import cloudinary from 'cloudinary';

// Configure Cloudinary with your credentials
cloudinary.v2.config({
    // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    // api_key: process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: "dcfhhdtjr",
    api_key: "996686144876562",
    api_secret: "AmcoNgLi1FS6Ei_zvcE0p1bijjU"
});

export default cloudinary.v2;
