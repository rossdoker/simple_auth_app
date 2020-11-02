import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../models/User';
import { userValidations } from '../../validations';
import { formatResponseError } from '../../utils/helpers';

const router = Router();

router.patch('/', async (req, res) => {
    const { avatar, name, email, password } = req.body;

    // validate request data
    const { error } = userValidations.update({ avatar, name, email, password });
    if (error) return res.status(400).send(formatResponseError(error.message));

    // create new user data object
    const newUserData: any = {
        avatar: avatar || req.user.avatar,
        name: name || req.user.name,
        email: email || req.user.email,
    }

    // crypt the password
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        newUserData.password = hashedPassword;
    }

    try {
        await User.findByIdAndUpdate(
            req.user.id,
            newUserData,
            {
                upsert: true,
                useFindAndModify: false,
            },
        );
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(formatResponseError('Server error'));
    }
});


export default router;