import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
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

        if (decoded.id) {
            req.user = { id: decoded.id }; // Set user info on req.user instead of req.body
            next();
        } else {
            return res.status(401).json({
                success: false,
                msg: 'Token does not contain valid user ID'
            });
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            msg: 'Token is not valid',
            error: error.message
        });
    }
}

export default userAuth;
