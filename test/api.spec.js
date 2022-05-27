const request = require('supertest');
const app = require ('../app');

describe('API server', () => {
    let api;

    beforeAll(() => {
        api = app.listen(6000, () => {
            console.log('Test server running on port 6000')
        })
    })

    afterAll((done) => {
        console.log('Gracefully stopping test server');
        api.close(done);
    })

    it('responds to get / with status 200', (done) => {
        request(api).get('/').expect(200, done);
    })

    it('responds to get /cats with status of 200', (done) => {
        request(api).get('/cats').expect(200, done);
    })

    it('retrieves a cat by id with 200', (done) => {
        request(api)
            .get('/cats/3')
            .expect(200)
            .expect({ id: 3, name: 'Shantae', age: 9}, done);
    })

    it('responds to a invalid method request with 405', (done) => {
        request(api).post('/').expect(405, done)
    })

    let testCat = {
        name: 'Bob',
        age: 6,
    };

    it('responds to post /cats with status 201', (done) => {
        request(api)
            .post('/cats')
            .send(testCat)
            .expect(201)
            .expect({ id: 4, ...testCat }, done);
    });

    it('responds to delete /cats/:id with status 204', async () => {
        await request(api).delete('/cats/4').expect(204);
    
        const updatedCats = await request(api).get('/cats');
    
        expect(updatedCats.body.length).toBe(3);
    });
})