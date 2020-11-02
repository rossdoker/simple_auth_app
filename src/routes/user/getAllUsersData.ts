import { Router } from 'express';
import User from '../../models/User';
import { formatResponseError } from '../../utils/helpers';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        return res.send(user.map((item) => ({
            id: item._id,
            email: item.email,
            name: item.name,
            avatar: item.avatar,
            isAdmin: item.isAdmin,
        })));
    } catch (err) {
        return res.status(500).send(formatResponseError('Server error'));
    }
});

export default router;