/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import chalk from 'chalk';
import jsonServer from 'json-server';
import pino from 'pino';
import fs from 'fs';

dotenv.config();

const app = jsonServer.create();
const router = jsonServer.router('./src/server/db.json');
const middlewares = jsonServer.defaults({
  static: './src/server/public',
});

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

// Set default middlewares (logger, static, cors and no-cache)
app.use(middlewares);
app.use(jsonServer.bodyParser);
app.use(jsonServer.bodyParser);
// app.use(upload.single('image'));

export type DesignCard = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  telegram: string;
  company: string;
  title: string;
  twitter: string;
  profile: string;
}

const validate = (body: DesignCard & {
  image: {
    name: string;
    thumbUrl: string;
  }
} & {
  [key: string]: string
}) => {
  const emptyField: string[] = [];
  const validateKey = [
    'email',
    'firstName',
    'lastName',
    'company',
    'title',
  ];
  validateKey.forEach((key: string) => !body[key] && emptyField.push(key));

  return {
    valid: emptyField.length === 0,
    emptyField,
    body: {
      ...body,
      id: undefined,
    },
  };
};

app.get('/', (req, res) => res.send('Server started'));

app.use((req, res, next) => {
  const { method } = req;
  const _path = req.path.split('/').pop();
  if (method === 'POST' && _path === 'designs') {
    const { valid, emptyField, body } = validate(req.body);
    if (!valid) {
      return res.status(400).send(`Missing required field: ${emptyField.join(', ')}`);
    }

    if (req.body.image) {
      const fileName = `${Date.now()}.${body.image.name}`;
      const base64Data = req.body.image.thumbUrl.replace(/^data:image\/png;base64,/, '');
      fs.writeFileSync(`./src/server/public/assets/images/${fileName}`, base64Data, 'base64');

      req.body = {
        ...body,
        image: `${process.env.SERVER_STATIC_IMAGES}/${fileName}`,
      };
      return next();
    }

    req.body = {
      ...body,
      image: `${process.env.SERVER_STATIC_IMAGES}/unknown_avatar.png`,
    };
  }

  next();
});

// Use default router
app.use('/api', router);

const { SERVER_PORT = 3000 } = process.env;
app.listen(SERVER_PORT, () => {
  logger.info(`Server:  ${chalk.cyan(`http://localhost:${SERVER_PORT}/`)}`);
});
