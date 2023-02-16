import jwt_decode from 'jwt-decode';

export const decodeToken = (authHeader) => {
    
    const token = authHeader && authHeader.split(' ')[1];
    const decoded = jwt_decode(token);

    return decoded;
};