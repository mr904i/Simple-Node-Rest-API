const request = require('supertest');
const server = require('../index');
let token;
// テストが終了したら、サーバをクローズする
afterAll(() => {
    'use strict';

    server.close();
});

describe('example.jsのリクエストのテスト', () => {
    'use strict';
    beforeAll((done) => {
        request(server)
        .post('/user_authentication')
        .send({"user": "user0","pass": "pass0"})
        .end((err, response) => {
            token = response.body.token; // save the token!
            done();
        });
    });

    describe('正常系テスト', () => {
        it('ログイン',async ()=>{
            const user = {"user": "user0","pass": "pass0"};
            const res = await (await request(server).post('/user_authentication').send(user));
            expect(res.status).toBe(200)
            // let token = res.body
            // console.log(token)
        })
        it('データ取得',async ()=>{
            //header に　tokenをつけて実行し,200で返すようにする
            const res = await request(server)
            .get('/example')
            .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200)
        })
    });
});