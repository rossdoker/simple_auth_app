import { Router } from 'express';
import { formatResponseError } from '../../utils/helpers';
import User from '../../models/User';

const router = Router();

router.delete('/', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(formatResponseError('Server error'));
    }
});

export default router;