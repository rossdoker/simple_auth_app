export { default as routeMiddlewares } from './_middlewares';
import userRoutes from './user';

import { IRoutesArray } from './types';

const routes: IRoutesArray[] = [
    userRoutes,
];

export default routes;

