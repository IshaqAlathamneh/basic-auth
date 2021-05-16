'use strict';
require('@code-fellows/supergoose');
const server = require('../src/server');
// server.app -> mock this server -> I dont have to run it here
// const server = require('../src/server');
// server.app -> mock this server -> I dont have to run it here
const superTest = require('supertest');
const serverRequest = superTest(server.app);// this will be my fake server
const base64 = require('base-64')


describe('Testing Server Module', ()=> {
    let consoleSpy;
    let myId;
    // beforeEach(()=> {
    //     consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    // });
    
    // // after the tests
    // afterEach(()=> {
    //     consoleSpy.mockRestore();
    // });
    it('404 on a bad route', async ()=> {
        let response = await serverRequest.get('/not-found-route');
        expect(response.status).toEqual(404);
    });

    it('create a new user', async ()=> {
        let obj = {username: 'bloozeh', password: 'hahahahaha'};
        let btata = await serverRequest.post('/signup').send(obj)

        expect(btata.body.username).toEqual("bloozeh");
        expect(btata.body.password == "hahahahaha").toBeFalsy();
        
    });

    it('login to my user user wrong or password wrong or passed', async ()=> {
        const userOne = base64.encode("ishaq:1999");
        let obj = {username: 'ishaq', password: 'admin123'};
        await serverRequest.post('/signup').send(obj);
        const responseOne = await serverRequest.post('/signin').set('Authorization', `Basic ${userOne}`)
        // console.log(responseOne);
        const userTwo = base64.encode("ishaqq:admin123");
        const responseTwo = await serverRequest.post('/signin').set('Authorization', `Basic ${userTwo}`)
        // console.log(responseTwo);
        const userThree = base64.encode("ishaq:admin123");
        const responseThree = await serverRequest.post('/signin').set('Authorization', `Basic ${userThree}`)
        // console.log(responseThree);
        expect(responseThree.status).toEqual(201);
        expect(responseTwo.text).toEqual("the username not correct");
        expect(responseOne.body.err).toEqual("the password not correct");
    });
});