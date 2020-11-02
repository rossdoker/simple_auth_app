import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { formatResponseError } from '../../utils/helpers';
import { userValidations } from '../../validations';
import User from '../../models/User';

const router = Router();

router.patch('/:id', async (req, res) => {
    try {
        // find user
        const user = await User.findById(req.params.id);
        if (!user) return res.status(400).send(formatResponseError('User not found'));

        // check for root
        if (user.isRoot) return res.status(401).send(formatResponseError('Access denied', 401));

        const { avatar, name, email, password, isAdmin} = req.body;

        // validate request data
        const { error } = userValidations.update({ avatar, name, email, password, isAdmin });
        if (error) return res.status(400).send(formatResponseError(error.message));

        // create new user data object
        const newUserData: any = {
            avatar: avatar || user.avatar,
            name: name || user.name,
            email: email || user.email,
            isAdmin: typeof isAdmin === 'boolean' ? isAdmin : user.isAdmin,
        }

        // crypt the password
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            newUserData.password = hashedPassword;
        }

        await User.findByIdAndUpdate(
            req.params.id,
            newUserData,
            {
                upsert: true,
                useFindAndModify: false,
            },
        );
        return res.sendStatus(200);

    } catch (err) {
        return res.status(500).send(formatResponseError('Server error'));
    }
});

export default router;
