import jwt from 'jsonwebtoken';

export function VerifyToken(token){
    try {
        if(token){
            const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
            return decoded;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        return false;
    }
}
