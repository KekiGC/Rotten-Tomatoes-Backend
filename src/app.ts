import  express  from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';
import authRoutes from './routes/auth.routes'
import specialRoutes from './routes/special.routes'
import movieRoutes from './routes/movie.routes'
import serieRoutes from './routes/serie.routes'

//inicio
const app =  express();


//configuraciones
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

//routes
app.get('/', (req, res) => {
    res.send(` THE API  is at http://localhost:${app.get('port')}`)
});

app.use(authRoutes);
app.use(specialRoutes);
app.use(movieRoutes);
app.use(serieRoutes);

export default app;