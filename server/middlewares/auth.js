import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    console.log('Auth header received:', authHeader); // Debug log
    
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            msg: 'No authorization header provided'
        });
    }
    
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            msg: 'Authorization header must start with "Bearer "'
        });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({
            success: false,
            msg: 'No token provided after Bearer'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded); // Debug log

        if (decoded.id) {
            req.body.userId = decoded.id;
            next();
        } else {
            return res.status(401).json({
                success: false,
                msg: 'Token does not contain valid user ID'
            });
        }
    } catch (error) {
        console.log('Token verification error:', error.message); // Debug log
        return res.status(401).json({
            success: false,
            msg: 'Token is not valid',
            error: error.message
        });
    }
}

export default userAuth;
