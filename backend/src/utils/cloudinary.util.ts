const {v2} = require('cloudinary');
const Hotel = require('../models/hotel.model.js');


export async function upload(url : string) {
    const { CLOUD_NAME , API_KEY, API_SECRET, CLOUDINARY_URL} = process.env
   
    v2.config({ 
        cloud_name: CLOUD_NAME, 
        api_key: API_KEY, 
        api_secret: API_SECRET 
    });

    try{
     const uploadResult = await v2.uploader
       .upload(
           `${url}`, 
       )
    return  uploadResult.url;
    }catch(error){
        throw new Error('Cloudinary upload failed');
    }
}


