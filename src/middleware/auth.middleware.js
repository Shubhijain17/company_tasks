import jwt from 'jsonwebtoken'


//generate token
const generateToken = (userData)=>{
    console.log(userData) //user data means paylod 
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn:'1d'})
}


const authenticate = (req, res, next) => {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send('Access Denied. No Token Provided.');
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).send('Invalid Token');
    }
  };

export  {generateToken, authenticate}