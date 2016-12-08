import axios from 'axios';
let client = axios.create({
    baseURL: 'http://localhost:20002/api',
    timeout: 10000,
    auth: {
        username: 'magneto',
        password: 'Magneto2017'
    }
});

client.interceptors.request.use(function (config) {
    config.headers['X-Access-Token'] = 'abc123';
    return config;
});

test('test sample post ', function () {
    return client.post('/test', {
        'ok': "ok"
    }).then(res => {
        let data = res.data;
        expect(data.ok).toBe("ok");
    }).catch(err => {
        console.log('err: ', err);
    })
})