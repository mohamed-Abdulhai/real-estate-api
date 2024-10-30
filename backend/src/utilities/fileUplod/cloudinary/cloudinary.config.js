import {v2 as cloudinary} from 'cloudinary'


    cloudinary.config({
            cloud_name: CLOUDINARY_CLOUD_NAME,
            api_key: CLOUDINARY_CLOUD_API_KEY,
            api_secret: CLOUDINARY_CLOUD_API_SECRET
        })

export {cloudinary}
    
