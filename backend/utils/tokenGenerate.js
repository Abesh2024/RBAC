import jwt from 'jsonwebtoken';

const generateUserToken = (userid, res) => {
    
        const token = jwt.sign({userid}, process.env.JWT_SECRET, {expiresIn: '10d'});
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        // next();
        return token;
}

export default generateUserToken;