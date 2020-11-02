import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import { userValidations } from '../../validations';
import { formatResponseError } from '../../utils/helpers';
import { TOKEN_SECRET, TOKEN_EXPIRATION_TIME } from '../../utils/consts';

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // validate request data
    const { error } = userValidations.login({
        email,
        password,
    });
    if (error) return res.status(400).send(formatResponseError(error.message));

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send(formatResponseError('User not found'));

    // check the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send(formatResponseError('Password is invalid'));

    // create and assign a token
    const token = jwt.sign({ id: user.id}, TOKEN_SECRET, {
        expiresIn: TOKEN_EXPIRATION_TIME,
    });

    // send token as response
    return res.send({ token });
});


export default router;