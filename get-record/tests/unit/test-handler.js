'use strict';

import app from '../../app.js';
import * as chai from 'chai';
const expect = chai.expect;
var event, context;

describe('Tests index', function () {
    it('verifies successful response', async () => {
        event = {
            path: '/record/pers/1039877046',
            httpMethod: 'GET',
            pathParameters: {
                user_id: '1039877046',
            }
        }
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        expect(response.message).to.be.equal("Record for user");
        // expect(response.location).to.be.an("string");
    });
});
