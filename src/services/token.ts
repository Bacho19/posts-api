import jwt from 'jsonwebtoken';

interface JwtAccessPayload {
    email: string;
}

class TokenService {
    genarateToken(payload: JwtAccessPayload) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET ?? '', {
            expiresIn: '1d',
        });

        return accessToken;
    }
}

export default new TokenService();
