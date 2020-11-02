import Joi from '@hapi/joi';

interface IData {
    email: string;
    password: string;
}

export default (data: IData) => {
    const schema = Joi.object({
        email: Joi.string().required().min(6).max(80).email(),
        password: Joi.string().required().min(6),
    });

    return schema.validate(data);
}
