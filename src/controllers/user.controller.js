import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const registerUser = asyncHandler(async (req,res)=> {
   
   //1.get user detail from front end
   //2.validate user detail
   //3.check if user already exist
   //4.check for images (avtar)
   //5.upload image to cloudinary ,avtar
   //6.create user object - create entry in database
   //7.remove password ,refreshToken from user object
   //8.check for user creation
   //9.send response to front end

   const {username,email,fullName,password} = req.body;
   console.log("User details from front end",username,email,fullName,password);

//    if(fullName === " "){
//     throw new ApiError(400,"Full name is required")
//    }

     if([fullName,username,email,password].some((field)=> field?.trim() === "")){
    throw new ApiError(400,"All fields are required")
     }

    const existedUser = User.findOne({$or:[{username},{email}]})
    if(existedUser){
        throw new ApiError(409,"User with email/username already exist")
    }
     
    console.log(req.files)
    const avtarLocalpPath=req.files?.avtar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path;

    if(!avtarLocalpPath){
        throw new ApiError(400,"Avtar image is required")
    }
    
    const avatar = await uploadOnCloudinary(avtarLocalpPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400,"Avtar image is required")
    }

    const user =await User.create({
        username:username.toLowerCase(),
        email,
        fullName,
        password,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500,"User creation failed")
    }

    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"))
})


const loginUser = asyncHandler(async (req,res) => {
    res.status(200).json({message: "ok"})
})

export {registerUser}