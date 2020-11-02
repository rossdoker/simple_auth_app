import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    const {_id, email, name, avatar, isAdmin, isRoot} = req.user;
    const userObj: any = {id: _id, email, name, avatar};
    if (isAdmin) userObj.isAdmin = true;
    if (isRoot) userObj.isRoot = true;
    return res.send(userObj);
});

export default router;