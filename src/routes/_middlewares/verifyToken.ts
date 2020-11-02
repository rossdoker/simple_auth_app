import jwt from 'jsonwebtoken';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { formatResponseError } from '../../utils/helpers';
import { TOKEN_SECRET } from '../../utils/consts';
import User from '../../models/User';
import redisClient from '../../redis';

const verifyToken: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    // check for auth header
    const token = req.header('Authorization');
    if (!token) return res.status(401).send(formatResponseError('Access denied', 401));

    // check for blacklisted token
    const blacklisted = await redisClient.get(`blacklist_${token}`);
    if (blacklisted) return res.status(401).send(formatResponseError('Access denied', 401));

    // decode id from token
    let _id;
    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        _id = (decoded as any).id;
    } catch (err) {
        return res.status(401).send(formatResponseError('Access denied', 401));
    }
    
    // find user by id
    const user = await User.findOne({ _id });
    if (!user) return res.status(401).send(formatResponseError('Access denied', 401));

    req.user = user;
    next();
}

export default verifyToken;