import { Router } from 'express';
import { formatResponseError } from '../../utils/helpers';
import User from '../../models/User';

const router = Router();

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(400).send(formatResponseError('No user found'));
        const { _id, email, name, avatar, isAdmin, isRoot } = user;
        return res.send({ id: _id, email, name, avatar, isAdmin, isRoot });
    } catch (err) {
        return res.status(400).send(formatResponseError('Incorrect id'));
    }
});

export default router;
