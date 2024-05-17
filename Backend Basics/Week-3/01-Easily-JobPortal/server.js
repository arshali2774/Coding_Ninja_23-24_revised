// imports
import express from 'express';
import session from 'express-session';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import ejsLayouts from 'express-ejs-layouts';

//app
const app = express();
// Get the directory name of the current module file
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Middlewares
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(
  session({
    secret: 'easilyJobPortal',
    resave: false,
    saveUninitialized: true,
  })
);
//EJS
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

//Routes
import authRoutes from './src/routes/authRoutes.js';
import jobRoutes from './src/routes/jobRoutes.js';

app.use(authRoutes);
app.use('/jobs', jobRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
