import { RequestHandler, Request, Response, NextFunction } from 'express';
import { formatResponseError } from '../../utils/helpers';

const verifyAdmin: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user.isAdmin) return res.status(401).send(formatResponseError('Access denied', 401));
    next();
}

export default verifyAdmin;