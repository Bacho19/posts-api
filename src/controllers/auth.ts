import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserEntity as User } from '../entities/User';
import { DecodedTokenFields } from '../types';
import tokenService from '../services/token';

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password, fullName, avatarUrl } = req.body;

            const candidateUser = await User.findOneBy({ email });

            if (candidateUser) {
                return res
                    .status(400)
                    .json({ message: 'User with this email already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = User.create();
            user.fullName = fullName;
            user.email = email;
            user.avatarUrl = avatarUrl;
            user.password = hashedPassword;

            user.save();

            const token = tokenService.genarateToken({ email });

            const resUser = {
                email: user.email,
                fullName: user.fullName,
                avatarUrl: user.avatarUrl ?? null,
                token,
            };

            return res.status(200).json(resUser);
        } catch (e) {
            return res
                .status(500)
                .json({ message: 'Something went wrong, please try again' });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;

            const candidateUser = await User.findOneBy({ email });

            if (!candidateUser) {
                return res
                    .status(400)
                    .json({ message: 'Invalid email or password' });
            }

            const isValidPassword = await bcrypt.compare(
                password,
                candidateUser.password
            );

            if (!isValidPassword) {
                return res
                    .status(400)
                    .json({ message: 'Invalid email or password' });
            }

            const token = tokenService.genarateToken({
                email: candidateUser.email,
            });

            const resUser = {
                email: candidateUser.email,
                fullName: candidateUser.fullName,
                avatarUrl: candidateUser.avatarUrl,
                token,
            };

            return res.json(resUser);
        } catch (e) {
            return res
                .status(500)
                .json({ message: 'Something went wrong, please try again' });
        }
    }

    async me(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            const tokenFields = jwt.verify(
                token ?? '',
                process.env.JWT_SECRET ?? ''
            );

            const user = await User.findOneBy({
                email: (<DecodedTokenFields>tokenFields).email,
            });

            // const resUser = new UserDto(user);

            res.json(user);
        } catch (e) {
            res.status(401).json({
                message: 'User is unauthorized',
            });
        }
    }
}

export default new AuthController();
