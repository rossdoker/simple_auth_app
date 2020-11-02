import { IRoutesArrayItem } from '../types';

import getUserData from './getUserData';
import getUserDataById from './getUserDataById';
import login from './login';
import register from './register';
import deleteUser from './deleteUser';
import deleteUserById from './deleteUserById';
import updateUserData from './updateUserData';
import updateUserDataById from './updateUserDataById';
import logout from './logout';
import getAllUsersData from './getAllUsersData';

const userRoutePrefix = '/user';
const usersRoutePrefix = '/users';
const routes: IRoutesArrayItem[] = [
    { type: 'public', router: login, prefix: userRoutePrefix, },
    { type: 'public', router: register, prefix: userRoutePrefix, },
    { type: 'private', router: getUserData, prefix: userRoutePrefix, },
    { type: 'private', router: deleteUser, prefix: userRoutePrefix, },
    { type: 'private', router: updateUserData, prefix: userRoutePrefix, },
    { type: 'private', router: logout, prefix: userRoutePrefix, },
    { type: 'admin', router: getUserDataById, prefix: userRoutePrefix, },
    { type: 'admin', router: deleteUserById, prefix: userRoutePrefix, },
    { type: 'admin', router: updateUserDataById, prefix: userRoutePrefix, },
    { type: 'admin', router: getAllUsersData, prefix: usersRoutePrefix, },
];

export default routes;

