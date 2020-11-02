import { Router } from 'express';
import { formatResponseError } from '../../utils/helpers';
import User from '../../models/User';

const router = Router();

router.delete('/:id', async (req, res) => {
    try {
        // find user
        const user = await User.findById(req.params.id);
        if (!user) return res.status(400).send(formatResponseError('User not found'));

        // disallow to delete root user
        if (user.isRoot) return res.status(401).send(formatResponseError('Access denied', 401));

        // remove user from DB
        await User.findByIdAndDelete(req.params.id);
        return res.sendStatus(200);
    } catch (err) {
        return res.status(500).send(formatResponseError('Server error'));
    }
});

export default router;
