import {v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config({
    path: './.env'
})

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

    const uploadOnCloudinary = async (localFilePath) => {
       try{
        // if(!localFilePath) throw new Error("File path is required for upload")
        if(!localFilePath) return null

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"})
        //if the upload is successful, delete the local file
        //console.log("File uploaded to Cloudinary successfully", response.secure_url)
         fs.unlinkSync(localFilePath)
        return response;
       }catch(error){
        fs.unlinkSync(localFilePath) //delete the local file if upload fails
        console.error("Error uploading file to Cloudinary", error)
        return null
       }
    }

    export {uploadOnCloudinary}