import Koa from 'koa';
import Router from '@koa/router';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = new Koa();
const router = new Router();

const ZOOM_OAUTH_INSTALL_URI = 'https://zoom.us/oauth/';
const ZOOM_TOKEN_REQUEST_URI = 'https://zoom.us/oauth/token';

router.get('/', ({ response }) => {
  response.body = '<a href="/install">Get Zoom OAuth token</a>';
});

router.get('/install', ({ response }) => {
  response.redirect(
    `${ZOOM_OAUTH_INSTALL_URI}authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=http://localhost:5000/redirect`,
  );
});

router.get('/redirect', async ({ request, response }) => {
  const code = request.query.code;

  if (code) {
    const credentials = Buffer.from(
      `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
    ).toString('base64');

    const body = `code=${code}&grant_type=authorization_code&redirect_uri=http://localhost:5000/redirect`;

    const res = await fetch(ZOOM_TOKEN_REQUEST_URI, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`,
      },
      body,
    });

    response.body = await res.json();
  } else {
    response.redirect('/');
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(5000, (e) => {
  if (e) {
    console.error(e);
  } else {
    console.log(`OAuth server running at http://localhost:5000`);
  }
});
