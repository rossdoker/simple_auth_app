import Joi from '@hapi/joi';

interface IData {
    name: string;
    email: string;
    password: string;
}

export default (data: IData) => {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(80),
        email: Joi.string().required().min(6).max(80).email(),
        password: Joi.string().required().min(6),
    });

    return schema.validate(data);
}
