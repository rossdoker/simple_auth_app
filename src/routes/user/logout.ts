import { Router } from 'express';
import redisClient from '../../redis';
import { TOKEN_EXPIRATION_TIME } from '../../utils/consts';

const router = Router();

router.post('/logout', async (req, res) => {
    const token = req.header('Authorization') as string;
    await redisClient.setex(`blacklist_${token}`, TOKEN_EXPIRATION_TIME / 100, 'true')
    return res.sendStatus(200);
});


export default router;