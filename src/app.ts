import express, {Router, RequestHandler} from 'express';
import mongoose from 'mongoose';
import { APP_PORT, DB_CONNECT } from './utils/consts';
import routesWrapper, { routeMiddlewares } from './routes';

const app = express();

// middlewares
app.use(express.json());

// routes
routesWrapper.forEach((routes) => {
    routes.forEach((route) => {
        const handlers: (Router | RequestHandler)[] = [route.router];
        if (route.type === 'admin') {handlers.unshift(routeMiddlewares.verifyAdmin)};
        if (route.type === 'private' || route.type === 'admin') handlers.unshift(routeMiddlewares.verifyToken);

        app.use(`/api${route.prefix}`, ...handlers);
    })
});



// app
(async () => {
    try {
        // DB connect
        await mongoose.connect(DB_CONNECT, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`Connected to DB!`);
        // start server
        app.listen(APP_PORT, () => {
            console.log(`App started on port ${APP_PORT}`);
        })

    } catch (err) {
        console.error(err);
    }
})();
