import Joi from '@hapi/joi';

interface IData {
    avatar?: string;
    name?: string;
    email?: string;
    password?: string;
    isAdmin?: boolean;
}

export default (data: IData) => {
    const schema = Joi.object({
        avatar: Joi.string().uri(),
        name: Joi.string().min(2).max(80),
        email: Joi.string().min(6).max(80).email(),
        password: Joi.string().min(6),
        isAdmin: Joi.boolean(),
    });

    return schema.validate(data);
}