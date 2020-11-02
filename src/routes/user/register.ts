import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../models/User';
import { userValidations } from '../../validations';
import { formatResponseError } from '../../utils/helpers';

const router = Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // validate request data
    const { error } = userValidations.register({
        name,
        email,
        password,
    });
    if (error) return res.status(400).send(formatResponseError(error.message));

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send(formatResponseError('User already exists'));

    // crypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = new User({
        name,
        email,
        password: hashedPassword,
    });

    try {
        // save user in DB
        await user.save();
        return res.sendStatus(200);
    } catch (err) {
        return res.status(500).send(formatResponseError('Server error'));
    }
});


export default router;