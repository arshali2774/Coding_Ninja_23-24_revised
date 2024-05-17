// third party imports
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swagger from 'swagger-ui-express';

// local imports
import { connectToDb } from './config/db.js';
import userRouter from './features/user/user.routes.js';
import { appLevelErrorHandlerMiddleware } from './middlewares/errorHandler.js';
import postRouter from './features/post/post.routes.js';
import { auth } from './utils/jwtAuth.js';
import commentRouter from './features/comment/comment.routes.js';
import likeRouter from './features/like/like.routes.js';
import friendshipRouter from './features/friendship/friendship.routes.js';
import otpRouter from './features/otp/otp.routes.js';
import apiDocs from './openapi.json' assert { type: 'json' };
//defaults
const app = express();
dotenv.config();

//middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());

//paths
app.use('/api-docs', swagger.serve, swagger.setup(apiDocs));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', auth, postRouter);
app.use('/api/v1/comments', auth, commentRouter);
app.use('/api/v1/likes', auth, likeRouter);
app.use('/api/v1/friends', auth, friendshipRouter);
app.use('/api/v1/otp', otpRouter);
//error management middleware
app.use(appLevelErrorHandlerMiddleware);

//port
const PORT = process.env.PORT || 3000;

//listen
app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
  connectToDb();
});
