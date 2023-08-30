import request from 'supertest';
import express, { Request, Response, Router } from 'express';
import router from '../../../server/routers/dbRouter';

const app = express();
app.use(express.json());
app.use(router);

describe('Testing /table route', () => {
  it('POST /table should return 200 and "OK"', async () => {
    // send empty object to pass validation
    const res = await request(app).post('/table').send({});
    expect(res.status).toBe(200);
    expect(res.text).toBe('OK');
  });
});
// describe('dbRouter', () => {
//   it('should return 200 status code', async () => {
//     const response = await request(router).post('/table');

//     expect(response.status).toBe(200);
//   });
// });
