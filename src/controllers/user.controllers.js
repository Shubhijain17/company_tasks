
import { asyncHandler } from '../utills/asyncHandler.js';
import { User } from '../models/userModel.js';
import { ApiError } from '../utills/ApiError.js';
import { generateToken } from '../middleware/auth.middleware.js';

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body
    console.log(req.body)
    if (!fullName || !email || !username || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username: username }, { email: email }]
    })
    console.log(existedUser)
    if (existedUser) {
        // res.json({success:false, message:"provide all details"}) -- 
        throw new ApiError(409, "User with email or username already  exists")
    }

    // entry on database
    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase(),
    })
    console.log(user)

    const createdUser = await User.findById(user._id).select("-password")

    if (!createdUser) {
        throw new ApiError(500, "Something went worng while registering user")
    }
    return res.status(201).json(createdUser)
    // new ApiResponse(200, createdUser, "user regesterd sucessfully")
    // )

});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }
    const user = await User.findOne({ email })
    console.log(user)
    if (!user) {
        throw new ApiError(400, 'User does not exist')
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(400, 'Invalid user credentials');
    }
    const payload = {
        _id: user.id,
        email: user.email
    }
    const token = generateToken(payload)
    const loggedInUser = await User.findById(user._id).select("-password")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .cookie('accessToken', token, options)
        .json({
            success: true,
            message: 'Login successful',
            user: loggedInUser,
            token: token,
        });
})
const getProfile = asyncHandler(async (req, res) => {
    let data = await User.findById(req.user?._id).select("-password")
    return res.json({
        success: true,
        message: 'get login user profile',
        user: data,
    });
})

const getRandomJoke = asyncHandler(async (req, res) => {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const jokeData = await response.json();
    console.log(jokeData);
    res.status(200).json({
        success: true,
        joke: jokeData,
    });
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id)

    const options = {
        httpOnly: true,
        secure: true
    }
    res.status(200)
        .clearCookie('accessToken', options)
        .json({
            success: true,
            message: 'User logged out successfully',
        });
})

export { registerUser, loginUser, getProfile, getRandomJoke, logoutUser };