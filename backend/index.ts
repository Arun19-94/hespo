import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { ROUTES } from './routes';
// import cors from 'cors';
import cookieParser from 'cookie-parser';
import connect from './component/mongo/mongo.local';
dotenv.config({path: './config.env'});

const app: Express = express();
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
// app.use(cors());
// app.use(helmet());
console.log("connect")
app.get('/', (req: Request, res: Response) => {
  console.log("---------------------")
  res.send('Express + TypeScript Server + backend');
});
 
const init =async () => {
  console.log("EXPRESS-MONGOss")
  await connect()
}
init()
for (let i = 0; i < ROUTES.length; i++) {
  const route = ROUTES[i];
  app.use(route)
  
}

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});